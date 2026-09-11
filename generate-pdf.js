import fs from 'fs';
import { jsPDF } from 'jspdf';

const regularFont = fs.readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf').toString('base64');
const boldFont = fs.readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf').toString('base64');
const italicFont = fs.readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf').toString('base64');
const boldItalicFont = fs.readFileSync('/usr/share/fonts/truetype/liberation/LiberationSans-BoldItalic.ttf').toString('base64');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
  compress: true
});

doc.addFileToVFS('LiberationSans-Regular.ttf', regularFont);
doc.addFont('LiberationSans-Regular.ttf', 'LiberationSans', 'normal');

doc.addFileToVFS('LiberationSans-Bold.ttf', boldFont);
doc.addFont('LiberationSans-Bold.ttf', 'LiberationSans', 'bold');

doc.addFileToVFS('LiberationSans-Italic.ttf', italicFont);
doc.addFont('LiberationSans-Italic.ttf', 'LiberationSans', 'italic');

doc.addFileToVFS('LiberationSans-BoldItalic.ttf', boldItalicFont);
doc.addFont('LiberationSans-BoldItalic.ttf', 'LiberationSans', 'bolditalic');

// Background
doc.setFillColor(255, 252, 248); // #fffcf8
doc.rect(0, 0, 210, 297, 'F');

// Outer ornamental frame
doc.setDrawColor(254, 243, 199); // #fef3c7
doc.setLineWidth(3.5);
doc.roundedRect(7, 7, 196, 283, 4, 4, 'S');

// Inner thin border
doc.setDrawColor(253, 230, 138); // #fde68a
doc.setLineWidth(0.4);
doc.roundedRect(10, 10, 190, 277, 3, 3, 'S');

// Top pill
doc.setFillColor(254, 243, 199); // #fef3c7
doc.roundedRect(62, 14, 86, 6.5, 3.25, 3.25, 'F');

doc.setFont('LiberationSans', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(146, 64, 14); // #92400e
doc.text('VILNIAUS ANTAKALNIO PROGIMNAZIJA', 105, 18.5, { align: 'center' });

// Main Title
doc.setFont('LiberationSans', 'bold');
doc.setFontSize(18);
doc.setTextColor(180, 83, 9); // #b45309
doc.text('MOKYKLOS SUSITARIMAI', 105, 27.5, { align: 'center' });

// Subtitle
doc.setFont('LiberationSans', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(120, 53, 15); // #78350f
doc.text('PARENGTI PAGAL PEPIS (POZITYVAUS ELGESIO PALAIKYMO IR INTERVENCIJŲ SISTEMOS) PRINCIPUS', 105, 33.5, { align: 'center' });

// Table Setup
const tableX = 12;
const tableY = 38;
const colW = [38, 50, 50, 48]; // total 186mm
const tableW = 186;

// Table Header
const headerH = 11;
doc.setFillColor(251, 191, 36); // #fbbf24
doc.rect(tableX, tableY, tableW, headerH, 'F');
doc.setDrawColor(217, 119, 6); // #d97706
doc.setLineWidth(0.5);
doc.rect(tableX, tableY, tableW, headerH, 'S');

// Header Vertical lines
let curX = tableX;
for (let i = 0; i < colW.length - 1; i++) {
  curX += colW[i];
  doc.line(curX, tableY, curX, tableY + headerH);
}

// Header Texts
doc.setFont('LiberationSans', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(120, 53, 15);

const headers = ['ERDVĖ', 'BENDRUOMENIŠKUMAS', 'PAGARBA IR TOLERANCIJA', 'ATSAKOMYBĖ'];
let hX = tableX;
for (let i = 0; i < headers.length; i++) {
  doc.text(headers[i], hX + 4, tableY + 7);
  hX += colW[i];
}

// Rows Definition
const rows = [
  {
    space: 'KLASĖJE',
    h: 22,
    bg: [255, 255, 255],
    community: 'Padedu ir priimu kiekvieną, įtraukiu į veiklą.',
    respect: 'Klausau, kai kitas kalba, leidžiu pasisakyti.',
    responsibility: 'Į pamoką ateinu laiku ir turiu reikiamas priemones.'
  },
  {
    space: 'VALGYKLOJE',
    h: 20,
    bg: [255, 251, 235], // #fffbeb
    community: 'Eilėje laukiu kantriai.',
    respect: 'Bendrauju ramiu balsu.',
    responsibility: 'Pavalgęs nusinešu indus, palieku stalą švarų.'
  },
  {
    space: 'TUALETUOSE',
    h: 23,
    bg: [255, 255, 255],
    community: 'Gerbiu laukiančiųjų eilę, neužtrunku.',
    respect: 'Saugau kito privatumą (nežiūriu, netrukdau).',
    responsibility: 'Palieku patalpą tvarkingą, saugau inventorių bei tausoju popierių ir muilą.'
  },
  {
    space: 'KORIDORIUOSE',
    h: 26,
    bg: [255, 251, 235],
    community: 'Pasisveikinu ir praleidžiu einantįjį.',
    respect: 'Bendrauju ramiu balsu ir neužgaunant kitų (be keiksmažodžių).',
    responsibility: 'Einu saugiai (nebėgioju), palieku praėjimą kitiems laukdamas vienoje sienos pusėje.'
  },
  {
    space: 'PERSIRENGIMO KAMBARIUOSE',
    h: 23,
    bg: [255, 255, 255],
    community: 'Priimu kiekvieną ir elgiuosi taip, kad neįžeisčiau ir neskaudinčiau kitų.',
    respect: 'Liečiu tik savo daiktus ir drabužius.',
    responsibility: 'Tvarkingai susidedu daiktus, greitai persirengiu.'
  },
  {
    space: 'VISUR IR VISADA',
    h: 30,
    bg: [255, 251, 235],
    community: 'Pasirūpinu ir padedu kitam.\nTelefoną laikau kuprinėje.',
    respect: 'Giriu girdint visiems, kritiką išsakau individualiai.',
    responsibility: 'Atsimenu, kad visos emocijos yra leistinos, bet ne visas elgesys yra priimtinas.',
    boldHighlight: true
  }
];

let rowY = tableY + headerH;

rows.forEach((r, idx) => {
  // Fill background
  doc.setFillColor(r.bg[0], r.bg[1], r.bg[2]);
  doc.rect(tableX, rowY, tableW, r.h, 'F');

  // Outer row border
  doc.setDrawColor(253, 230, 138); // #fde68a
  doc.setLineWidth(0.4);
  doc.rect(tableX, rowY, tableW, r.h, 'S');

  // Vertical dividers
  let cx = tableX;
  for (let i = 0; i < colW.length - 1; i++) {
    cx += colW[i];
    doc.line(cx, rowY, cx, rowY + r.h);
  }

  // Col 1: Space name
  doc.setFont('LiberationSans', 'bold');
  doc.setFontSize(r.space.length > 15 ? 7.5 : 8.5);
  doc.setTextColor(180, 83, 9); // #b45309
  doc.text(r.space, tableX + 3.5, rowY + 7, { maxWidth: colW[0] - 7 });

  // Col 2, 3, 4 Texts
  doc.setFont('LiberationSans', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85); // #334155

  // Col 2: Community
  if (r.boldHighlight && r.community.includes('Telefoną laikau kuprinėje.')) {
    doc.text('Pasirūpinu ir padedu kitam.', tableX + colW[0] + 3.5, rowY + 6.5, { maxWidth: colW[1] - 7 });
    doc.setFont('LiberationSans', 'bold');
    doc.text('Telefoną laikau kuprinėje.', tableX + colW[0] + 3.5, rowY + 12, { maxWidth: colW[1] - 7 });
    doc.setFont('LiberationSans', 'normal');
  } else {
    doc.text(r.community, tableX + colW[0] + 3.5, rowY + 6.5, { maxWidth: colW[1] - 7 });
  }

  // Col 3: Respect
  doc.text(r.respect, tableX + colW[0] + colW[1] + 3.5, rowY + 6.5, { maxWidth: colW[2] - 7 });

  // Col 4: Responsibility
  if (r.boldHighlight) {
    doc.setFont('LiberationSans', 'bold');
    doc.text(r.responsibility, tableX + colW[0] + colW[1] + colW[2] + 3.5, rowY + 6.5, { maxWidth: colW[3] - 7 });
    doc.setFont('LiberationSans', 'normal');
  } else {
    doc.text(r.responsibility, tableX + colW[0] + colW[1] + colW[2] + 3.5, rowY + 6.5, { maxWidth: colW[3] - 7 });
  }

  rowY += r.h;
});

// Director's Thank You Box
const boxY = rowY + 7;
const boxH = 43;

doc.setFillColor(255, 255, 255);
doc.roundedRect(tableX, boxY, tableW, boxH, 3.5, 3.5, 'F');

doc.setDrawColor(245, 158, 11); // #f59e0b
doc.setLineWidth(0.8);
doc.roundedRect(tableX, boxY, tableW, boxH, 3.5, 3.5, 'S');

// Star accent symbol
doc.setFont('LiberationSans', 'bold');
doc.setFontSize(22);
doc.setTextColor(245, 158, 11);
doc.text('★', tableX + 5, boxY + 14);

// Quote text
doc.setFont('LiberationSans', 'bolditalic');
doc.setFontSize(10.5);
doc.setTextColor(120, 53, 15); // #78350f
const quote = '„Ačiū, kad kuriate saugią ir bendradarbiaujančią mokyklos aplinką. Tik kartu galime sukurti mokyklą, kurioje vadovaujamės bendrais susitarimais ir vertybėmis!“';
doc.text(quote, tableX + 16, boxY + 9, { maxWidth: tableW - 22, lineHeightFactor: 1.4 });

// Author
doc.setFont('LiberationSans', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(146, 64, 14);
doc.text('TOMAS JANKŪNAS', tableX + 16, boxY + 31);

// Subtitle
doc.setFont('LiberationSans', 'normal');
doc.setFontSize(8);
doc.setTextColor(100, 116, 139);
doc.text('Vilniaus Antakalnio progimnazijos direktorius', tableX + 16, boxY + 36.5);

// Footer bar
const footerY = 271;
doc.setDrawColor(226, 232, 240); // #e2e8f0
doc.setLineWidth(0.3);
doc.line(tableX, footerY, tableX + tableW, footerY);

doc.setFont('LiberationSans', 'normal');
doc.setFontSize(6.5);
doc.setTextColor(148, 163, 184); // #94a3b8
doc.text('VILNIAUS ANTAKALNIO PROGIMNAZIJA • WWW.ANTAKALNIO.LT', tableX, footerY + 5);
doc.text('SUSITARIMAI ATNAUJINTI: 2026-09-10', tableX + tableW, footerY + 5, { align: 'right' });

const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/Vilniaus_Antakalnio_progimnazija_Mokyklos_susitarimai_PEPIS.pdf', pdfBuffer);
fs.writeFileSync('./public/susitarimai-pepis.pdf', pdfBuffer);

console.log('PDF generated successfully! Size:', pdfBuffer.length);
