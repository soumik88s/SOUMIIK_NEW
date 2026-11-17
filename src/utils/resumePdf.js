import { jsPDF } from 'jspdf';
import { PERSONAL } from '../data/personal';
import { EDUCATION, INTERNSHIPS } from '../data/education';
import { PRIMARY_PROJECTS } from '../data/projects';
import { SKILL_CATEGORIES } from '../data/skills';
import { CERTIFICATIONS_AND_ACHIEVEMENTS } from '../data/certifications';

export const RESUME_PDF_FILENAME = 'Soumik-Chakraborty-Resume.pdf';

export function buildResumeDocumentData() {
  return {
    personal: PERSONAL,
    summary: PERSONAL.introParagraphs[0],
    education: EDUCATION,
    internships: INTERNSHIPS,
    projects: PRIMARY_PROJECTS,
    skillCategories: SKILL_CATEGORIES,
    credentials: CERTIFICATIONS_AND_ACHIEVEMENTS,
    languages: PERSONAL.languages,
  };
}

export function createResumePdfDocument() {
  const data = buildResumeDocumentData();
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 44;
  const maxWidth = pageWidth - marginX * 2;
  const bottomMargin = 46;
  let y = 48;

  const ensureSpace = (needed = 24) => {
    if (y + needed > pageHeight - bottomMargin) {
      doc.addPage();
      y = 48;
    }
  };

  const drawSectionHeading = (title) => {
    ensureSpace(34);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(124, 109, 170);
    doc.text(title.toUpperCase(), marginX, y);
    y += 5;
    doc.setDrawColor(210, 196, 245);
    doc.setLineWidth(0.75);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 14;
  };

  const drawWrappedText = (text, options = {}) => {
    const {
      fontSize = 9.5,
      fontStyle = 'normal',
      color = [52, 46, 74],
      indent = 0,
      lineHeight = 13.5,
    } = options;

    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);

    const lines = doc.splitTextToSize(String(text), maxWidth - indent);
    lines.forEach((line) => {
      ensureSpace(lineHeight + 2);
      doc.text(line, marginX + indent, y);
      y += lineHeight;
    });
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(33, 29, 50);
  doc.text(data.personal.name, marginX, y);
  y += 17;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(124, 109, 170);
  doc.text(data.personal.title, marginX, y);
  y += 14;

  drawWrappedText(
    `${data.personal.location}  |  ${data.personal.email}  |  ${data.personal.phone}`,
    { fontSize: 8.8, color: [90, 83, 112], lineHeight: 12 }
  );
  drawWrappedText(
    `GitHub: ${data.personal.github}  |  LinkedIn: ${data.personal.linkedin}`,
    { fontSize: 8.5, color: [90, 83, 112], lineHeight: 12 }
  );
  y += 4;

  // Summary
  drawSectionHeading('Summary');
  drawWrappedText(data.summary);

  // Education
  drawSectionHeading('Education');
  data.education.forEach((edu) => {
    ensureSpace(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(33, 29, 50);
    doc.text(edu.degree, marginX, y);

    const rightMeta = `${edu.period}  |  ${edu.metricLabel}: ${edu.metricValue}`;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(90, 83, 112);
    doc.text(rightMeta, pageWidth - marginX, y, { align: 'right' });
    y += 13;

    drawWrappedText(edu.institution, { fontSize: 9, color: [90, 83, 112], lineHeight: 12.5 });
    y += 4;
  });

  // Internship
  drawSectionHeading('Internship Experience');
  data.internships.forEach((intern) => {
    ensureSpace(32);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(33, 29, 50);
    doc.text(`${intern.role} — ${intern.organization}`, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(90, 83, 112);
    doc.text(intern.period, pageWidth - marginX, y, { align: 'right' });
    y += 14;

    intern.responsibilities.forEach((bullet) => {
      drawWrappedText(`- ${bullet}`, {
        fontSize: 9.2,
        indent: 8,
        lineHeight: 13,
      });
    });
    y += 3;
  });

  // Projects
  drawSectionHeading('Selected Projects');
  data.projects.forEach((proj) => {
    ensureSpace(42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(33, 29, 50);
    doc.text(`${proj.name} — ${proj.subtitle}`, marginX, y);
    y += 13;

    drawWrappedText(proj.shortDescription, { fontSize: 9.2, lineHeight: 12.5 });
    drawWrappedText(`Stack: ${proj.technologies.join(', ')}`, {
      fontSize: 8.6,
      color: [90, 83, 112],
      lineHeight: 12,
    });
    y += 5;
  });

  // Technical Skills
  drawSectionHeading('Technical Skills');
  data.skillCategories.forEach((cat) => {
    drawWrappedText(`${cat.title}: ${cat.items.map((item) => item.name).join(', ')}`, {
      fontSize: 9.1,
      lineHeight: 13,
    });
  });

  // Certifications & Achievements
  drawSectionHeading('Certifications & Achievements');
  data.credentials.forEach((cred) => {
    drawWrappedText(`- ${cred.title} — ${cred.issuer} (${cred.status})`, {
      fontSize: 9.1,
      indent: 6,
      lineHeight: 12.5,
    });
  });

  // Languages
  drawSectionHeading('Languages');
  drawWrappedText(
    data.languages.map((lang) => `${lang.name} (${lang.level})`).join('  |  '),
    { fontSize: 9.2, lineHeight: 13 }
  );

  return doc;
}

export function generateResumePdfBlob() {
  const doc = createResumePdfDocument();
  return {
    blob: doc.output('blob'),
    pageCount: doc.getNumberOfPages(),
    filename: RESUME_PDF_FILENAME,
  };
}

export function downloadResumePdf() {
  const { blob, pageCount, filename } = generateResumePdfBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  return { filename, pageCount, size: blob.size };
}
