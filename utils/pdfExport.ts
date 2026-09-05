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
