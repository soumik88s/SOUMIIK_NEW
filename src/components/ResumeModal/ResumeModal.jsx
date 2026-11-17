import { useEffect, useRef, useState } from 'react';
import { Check, Download, Printer, X } from 'lucide-react';
import { PERSONAL } from '../../data/personal';
import { EDUCATION, INTERNSHIPS } from '../../data/education';
import { PRIMARY_PROJECTS } from '../../data/projects';
import { SKILL_CATEGORIES } from '../../data/skills';
import { CERTIFICATIONS_AND_ACHIEVEMENTS } from '../../data/certifications';
import { downloadResumePdf } from '../../utils/resumePdf';

export function ResumeModal({ isOpen, onClose }) {
  const closeRef = useRef(null);
  const [pdfFeedback, setPdfFeedback] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('printing-resume');

    const timer = window.setTimeout(() => closeRef.current?.focus(), 20);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove('printing-resume');
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!pdfFeedback) return undefined;
    const clearId = window.setTimeout(() => setPdfFeedback(''), 4500);
    return () => window.clearTimeout(clearId);
  }, [pdfFeedback]);

  if (!isOpen) return null;

  const handleSavePdf = () => {
    try {
      const result = downloadResumePdf();
      setPdfFeedback(`Downloaded ${result.filename} (${result.pageCount} pages)`);
    } catch {
      setPdfFeedback('Unable to generate PDF in this browser. Try Print instead.');
    }
  };

  const handlePrint = () => {
    let beforePrintFired = false;
    const onBeforePrint = () => {
      beforePrintFired = true;
    };
    window.addEventListener('beforeprint', onBeforePrint, { once: true });

    try {
      window.print();
    } catch {
      setPdfFeedback('Browser print dialog was blocked here — click Save as PDF to download directly.');
    }

    window.setTimeout(() => {
      window.removeEventListener('beforeprint', onBeforePrint);
      if (!beforePrintFired) {
        setPdfFeedback(
          'If your preview window blocks Print, click Save as PDF to download the file directly.'
        );
      }
    }, 350);
  };

  return (
    <div
      className="print-resume-root fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Soumik Chakraborty Resume Viewer"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="fixed inset-0 bg-[#12101b]/75 backdrop-blur-md no-print"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="print-resume-card glass-panel relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[var(--color-surface-elevated)]">
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-[var(--glass-border)] px-5 py-3.5">
          <div>
            <h2 className="font-display text-base font-bold text-[var(--color-text)]">
              Resume — {PERSONAL.name}
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              {pdfFeedback || 'Download directly as A4 PDF or print'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSavePdf}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[var(--color-deep-purple)] px-4 text-xs font-medium text-white dark:text-[#12101b] transition-opacity hover:opacity-90"
            >
              {pdfFeedback.startsWith('Downloaded') ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface)] px-3.5 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print</span>
            </button>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="print-resume-scroll overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-[var(--color-text)]">
          <div className="border-b border-[var(--glass-border)] pb-4">
            <h3 className="font-display text-2xl font-bold">{PERSONAL.name}</h3>
            <p className="mt-1 font-medium text-[var(--color-purple)]">{PERSONAL.title}</p>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              {PERSONAL.location} · {PERSONAL.email} · {PERSONAL.phone} · GitHub: github.com/soumik88s
            </p>
          </div>

          <section>
            <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--color-purple)]">
              Summary
            </h4>
            <p className="mt-2 leading-relaxed text-[var(--color-muted)]">
              {PERSONAL.introParagraphs[0]}
            </p>
          </section>

          <section>
            <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--color-purple)]">
              Education
            </h4>
            <div className="mt-2 space-y-3">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-xs text-[var(--color-muted)]">{edu.institution}</div>
                  </div>
                  <div className="font-mono-tabular text-xs text-[var(--color-muted)]">
                    {edu.period} · {edu.metricLabel}: {edu.metricValue}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--color-purple)]">
              Internship Experience
            </h4>
            {INTERNSHIPS.map((intern) => (
              <div key={intern.id} className="mt-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold">
                    {intern.role} — {intern.organization}
                  </span>
                  <span className="font-mono-tabular text-xs text-[var(--color-muted)]">
                    {intern.period}
                  </span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[var(--color-muted)]">
                  {intern.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--color-purple)]">
              Selected Projects
            </h4>
            <div className="mt-2 space-y-2.5">
              {PRIMARY_PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <div className="font-semibold">
                    {proj.name} —{' '}
                    <span className="font-normal text-[var(--color-muted)]">{proj.subtitle}</span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)]">{proj.shortDescription}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text)]/80">
                    Stack: {proj.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--color-purple)]">
              Technical Skills
            </h4>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="text-xs">
                  <span className="font-semibold">{cat.title}: </span>
                  <span className="text-[var(--color-muted)]">
                    {cat.items.map((item) => item.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[var(--color-purple)]">
              Certifications &amp; Achievements
            </h4>
            <ul className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-[var(--color-muted)] sm:grid-cols-2">
              {CERTIFICATIONS_AND_ACHIEVEMENTS.map((item) => (
                <li key={item.id}>
                  <span className="font-medium text-[var(--color-text)]">{item.title}</span> —{' '}
                  {item.issuer} ({item.status})
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
