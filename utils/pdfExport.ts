import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { EmailTemplate } from '../types';

export interface ExportPdfData {
  title: string;
  category: string;
  level?: string;
  subject: string;
  body: string;
  to?: string;
  cc?: string;
}

function formatDateLithuanian(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[ąčęėįšųūž]/g, c => {
      const map: Record<string, string> = {
        'ą': 'a', 'č': 'c', 'ę': 'e', 'ė': 'e', 'į': 'i',
        'š': 's', 'ų': 'u', 'ū': 'u', 'ž': 'z'
      };
      return map[c] || c;
    })
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildDocumentHtml(data: ExportPdfData): string {
  const dateFormatted = formatDateLithuanian();
  const escapedTitle = escapeHtml(data.title);
  const escapedCategory = escapeHtml(data.category);
  const escapedLevel = data.level ? escapeHtml(data.level) : '';
  const escapedSubject = escapeHtml(data.subject);
  const escapedBody = escapeHtml(data.body);
  const escapedTo = data.to ? escapeHtml(data.to) : '';
  const escapedCc = data.cc ? escapeHtml(data.cc) : '';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 794px; min-height: 1050px; padding: 48px 56px; box-sizing: border-box; background: #ffffff; color: #0f172a; position: relative;">
      
      <!-- Viršutinė antraštė -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 18px; margin-bottom: 28px;">
        <div>
          <div style="font-size: 15px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            Vilniaus Antakalnio progimnazija
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 1px; margin-top: 3px;">
            Ugdymo pagalbos specialistų komanda (VAP)
          </div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">
            Antakalnio g. 29 / 33, LT-10312 Vilnius • www.antakalnio.lt
          </div>
        </div>
        <div style="text-align: right;">
          <div style="display: inline-block; padding: 4px 10px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 9px; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.5px;">
            ${escapedCategory} ${escapedLevel ? `• ${escapedLevel} LYGIS` : ''}
          </div>
          <div style="font-size: 10px; font-weight: 600; color: #64748b; margin-top: 6px;">
            Dokumento data: <strong style="color: #0f172a;">${dateFormatted}</strong>
          </div>
        </div>
      </div>

      <!-- Dokumento pavadinimas -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: #047857; margin-bottom: 4px;">
          Oficialus pranešimo / kreipimosi šablonas
        </div>
        <h1 style="margin: 0; font-size: 19px; font-weight: 900; color: #0f172a; text-transform: uppercase; line-height: 1.3;">
          ${escapedTitle}
        </h1>
      </div>

      <!-- Laiško atributų lentelė -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; margin-bottom: 28px; font-size: 11px; line-height: 1.5;">
        <div style="display: flex; margin-bottom: 6px;">
          <div style="width: 100px; font-weight: 800; text-transform: uppercase; font-size: 9px; color: #64748b; letter-spacing: 0.5px; padding-top: 1px;">Tema:</div>
          <div style="flex: 1; font-weight: 700; color: #0f172a;">${escapedSubject}</div>
        </div>
        ${escapedTo ? `
        <div style="display: flex; margin-bottom: 4px;">
          <div style="width: 100px; font-weight: 800; text-transform: uppercase; font-size: 9px; color: #64748b; letter-spacing: 0.5px; padding-top: 1px;">Gavėjas:</div>
          <div style="flex: 1; color: #334155; font-weight: 500;">${escapedTo}</div>
        </div>` : ''}
        ${escapedCc ? `
        <div style="display: flex;">
          <div style="width: 100px; font-weight: 800; text-transform: uppercase; font-size: 9px; color: #64748b; letter-spacing: 0.5px; padding-top: 1px;">Kopija (CC):</div>
          <div style="flex: 1; color: #475569; font-weight: 500;">${escapedCc}</div>
        </div>` : ''}
      </div>

      <!-- Dokumento turinys -->
      <div style="font-size: 13px; line-height: 1.75; color: #1e293b; white-space: pre-wrap; font-weight: 500; margin-bottom: 48px; min-height: 280px;">
${escapedBody}
      </div>

      <!-- Parašo blokas -->
      <div style="border-top: 1px dashed #cbd5e1; padding-top: 24px; margin-top: auto; display: flex; justify-content: space-between; font-size: 11px;">
        <div>
          <div style="font-weight: 800; color: #0f172a; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px; margin-bottom: 3px;">
            Dokumentą parengė ir pateikė:
          </div>
          <div style="color: #64748b; font-size: 10px;">
            Ugdymo pagalbos specialistas / Klasės vadovas
          </div>
          <div style="margin-top: 28px; border-bottom: 1px solid #94a3b8; width: 220px;"></div>
          <div style="font-size: 8px; color: #94a3b8; margin-top: 4px; text-transform: uppercase;">
            (Vardas, pavardė, parašas)
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-weight: 800; color: #0f172a; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px; margin-bottom: 3px;">
            Data ir registracija:
          </div>
          <div style="color: #64748b; font-size: 10px;">
            ${dateFormatted}
          </div>
          <div style="margin-top: 28px; border-bottom: 1px solid #94a3b8; width: 140px; margin-left: auto;"></div>
          <div style="font-size: 8px; color: #94a3b8; margin-top: 4px; text-transform: uppercase;">
            (Reg. Nr.)
          </div>
        </div>
      </div>

      <!-- Apatinė pastaba -->
      <div style="margin-top: 36px; padding-top: 12px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">
        Vilniaus Antakalnio progimnazija • VAP Pagalbos sistemos dokumentų modulis
      </div>
    </div>
  `;
}

/**
 * Eksportuoja šabloną į PDF failą ir inicijuoja tiesioginį jo atsisiuntimą
 */
export async function exportTemplateToPdf(data: ExportPdfData): Promise<void> {
  // Sukuriame laikiną nematomą elementą ekrane renderinimui
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.zIndex = '-1000';
  container.style.width = '794px';
  container.innerHTML = buildDocumentHtml(data);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
    }

    const filename = `VAP_${sanitizeFilename(data.title)}_${formatDateLithuanian()}.pdf`;
    pdf.save(filename);
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Atidaro spausdinimo langą (Print to PDF ar tiesioginis spausdintuvas)
 */
export function printTemplateDirectly(data: ExportPdfData): void {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const html = `
    <!DOCTYPE html>
    <html lang="lt">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(data.title)} - Vilniaus Antakalnio progimnazija</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
        body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      </style>
    </head>
    <body>
      ${buildDocumentHtml(data)}
    </body>
    </html>
  `;

  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.warn('Print blocked, falling back to PDF download:', err);
        exportTemplateToPdf(data);
      } finally {
        setTimeout(() => {
          try {
            document.body.removeChild(iframe);
          } catch {}
        }, 3000);
      }
    }, 400);
  } else {
    exportTemplateToPdf(data);
  }
}

/**
 * Mokyklos susitarimų (PEPIS) HTML šablonas A4 spaudai ir PDF eksportui
 */
export function buildAgreementsHtml(): string {
  const dateFormatted = formatDateLithuanian();

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 794px; min-height: 1050px; padding: 40px 48px; box-sizing: border-box; background: #fffcf8; color: #1e293b; position: relative; border: 12px solid #fef3c7;">
      
      <!-- Viršutinis dekoratyvinis rėmelis / Logotipas -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; padding: 4px 14px; background: #fef3c7; border-radius: 9999px; font-size: 10px; font-weight: 900; color: #92400e; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
          Vilniaus Antakalnio progimnazija
        </div>
        <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #b45309; text-transform: uppercase; letter-spacing: 2px; line-height: 1.2;">
          MOKYKLOS SUSITARIMAI
        </h1>
        <div style="font-size: 11px; font-weight: 700; color: #78350f; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">
          Parengti pagal PEPIS (Pozityvaus elgesio palaikymo ir intervencijų sistemos) principus
        </div>
      </div>

      <!-- Susitarimų lentelė -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 11px; line-height: 1.45;">
        <thead>
          <tr style="background: #fbbf24; color: #78350f;">
            <th style="padding: 10px 12px; border: 1.5px solid #d97706; text-align: left; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; width: 22%;">
              ERDVĖ
            </th>
            <th style="padding: 10px 12px; border: 1.5px solid #d97706; text-align: left; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; width: 26%;">
              BENDRUOMENIŠKUMAS
            </th>
            <th style="padding: 10px 12px; border: 1.5px solid #d97706; text-align: left; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; width: 26%;">
              PAGARBA IR TOLERANCIJA
            </th>
            <th style="padding: 10px 12px; border: 1.5px solid #d97706; text-align: left; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; width: 26%;">
              ATSAKOMYBĖ
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- KLASĖJE -->
          <tr style="background: #ffffff;">
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; font-weight: 900; color: #b45309; text-transform: uppercase; font-size: 11px;">
              KLASĖJE
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Padedu ir priimu kiekvieną, įtraukiu į veiklą.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Klausau, kai kitas kalba, leidžiu pasisakyti.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Į pamoką ateinu laiku ir turiu reikiamas priemones.
            </td>
          </tr>

          <!-- VALGYKLOJE -->
          <tr style="background: #fffbeb;">
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; font-weight: 900; color: #b45309; text-transform: uppercase; font-size: 11px;">
              VALGYKLOJE
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Eilėje laukiu kantriai.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Bendrauju ramiu balsu.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Pavalgęs nusinešu indus, palieku stalą švarų.
            </td>
          </tr>

          <!-- TUALETUOSE -->
          <tr style="background: #ffffff;">
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; font-weight: 900; color: #b45309; text-transform: uppercase; font-size: 11px;">
              TUALETUOSE
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Gerbiu laukiančiųjų eilę, neužtrunku.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Saugau kito privatumą (nežiūriu, netrukdau).
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Palieku patalpą tvarkingą, saugau inventorių bei tausoju popierių ir muilą.
            </td>
          </tr>

          <!-- KORIDORIUOSE -->
          <tr style="background: #fffbeb;">
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; font-weight: 900; color: #b45309; text-transform: uppercase; font-size: 11px;">
              KORIDORIUOSE
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Pasisveikinu ir praleidžiu einantįjį.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Bendrauju ramiu balsu ir neužgaunant kitų (be keiksmažodžių).
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Einu saugiai (nebėgioju), palieku praėjimą kitiems laukdamas vienoje sienos pusėje.
            </td>
          </tr>

          <!-- PERSIRENGIMO KAMBARIUOSE -->
          <tr style="background: #ffffff;">
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; font-weight: 900; color: #b45309; text-transform: uppercase; font-size: 11px;">
              PERSIRENGIMO KAMBARIUOSE
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Priimu kiekvieną ir elgiuosi taip, kad neįžeisčiau ir neskaudinčiau kitų.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Liečiu tik savo daiktus ir drabužius.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Tvarkingai susidedu daiktus, greitai persirengiu.
            </td>
          </tr>

          <!-- VISUR IR VISADA -->
          <tr style="background: #fffbeb;">
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; font-weight: 900; color: #b45309; text-transform: uppercase; font-size: 11px;">
              VISUR IR VISADA
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Pasirūpinu ir padedu kitam.<br/>
              <strong>Telefoną laikau kuprinėje.</strong>
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              Giriu girdint visiems, kritiką išsakau individualiai.
            </td>
            <td style="padding: 11px 12px; border: 1.5px solid #fde68a; color: #334155;">
              <strong>Atsimenu, kad visos emocijos yra leistinos, bet ne visas elgesys yra priimtinas.</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Direktoriaus Tomo Jankūno padėka -->
      <div style="background: #ffffff; border: 2px solid #f59e0b; border-radius: 12px; padding: 18px 22px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="display: flex; align-items: flex-start; gap: 14px;">
          <div style="font-size: 28px; line-height: 1;">🌟</div>
          <div style="flex: 1;">
            <div style="font-size: 13px; font-weight: 700; color: #78350f; font-style: italic; line-height: 1.5; margin-bottom: 8px;">
              „Ačiū, kad kuriate saugią ir bendradarbiaujančią mokyklos aplinką. Tik kartu galime sukurti mokyklą, kurioje vadovaujamės bendrais susitarimais ir vertybėmis!“
            </div>
            <div style="font-size: 11px; font-weight: 900; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px;">
              Tomas Jankūnas
            </div>
            <div style="font-size: 10px; font-weight: 600; color: #64748b;">
              Vilniaus Antakalnio progimnazijos direktorius
            </div>
          </div>
        </div>
      </div>

      <!-- Apatinė paraštė / data -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">
        <div>Vilniaus Antakalnio progimnazija • www.antakalnio.lt</div>
        <div>Susitarimai atnaujinti: <strong>${dateFormatted}</strong></div>
      </div>
    </div>
  `;
}

/**
 * Eksportuoja Mokyklos susitarimus į PDF failą
 */
export async function exportAgreementsToPdf(): Promise<void> {
  const filename = 'Vilniaus_Antakalnio_progimnazija_Mokyklos_susitarimai_PEPIS.pdf';
  const fileUrl = `/${filename}`;

  // Pirmiausia bandome tiesiogiai parsiųsti paruoštą aukštos kokybės PDF dokumentą
  try {
    const response = await fetch(fileUrl, { method: 'HEAD' });
    if (response.ok) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  } catch (e) {
    console.warn('Tiesioginis PDF atsiuntimas nepasiekiamas, generuojama naršyklėje:', e);
  }

  // Atsarginis variantas: dinaminis generavimas naršyklėje
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.zIndex = '-1000';
  container.style.width = '794px';
  container.style.minHeight = '1123px';
  container.innerHTML = buildAgreementsHtml();
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fffcf8',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(filename);
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Atidaro susitarimų spausdinimo langą
 */
export function printAgreementsDirectly(): void {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const html = `
    <!DOCTYPE html>
    <html lang="lt">
    <head>
      <meta charset="UTF-8">
      <title>Mokyklos susitarimai (PEPIS) - Vilniaus Antakalnio progimnazija</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 6mm;
        }
        body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      </style>
    </head>
    <body>
      ${buildAgreementsHtml()}
    </body>
    </html>
  `;

  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.warn('Print blocked, falling back to PDF download:', err);
        exportAgreementsToPdf();
      } finally {
        setTimeout(() => {
          try {
            document.body.removeChild(iframe);
          } catch {}
        }, 3000);
      }
    }, 400);
  } else {
    exportAgreementsToPdf();
  }
}
