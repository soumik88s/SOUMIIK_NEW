import { Link } from 'react-router-dom';
import { ArrowUp, Code2, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { PERSONAL } from '../../data/personal';

export function Footer({ onOpenResume }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-[var(--glass-border)] bg-[var(--glass-background)] backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.75fr_0.85fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#9b8ec4] to-[#514477] font-display text-sm font-bold text-white">
                {PERSONAL.monogram}
              </span>
              <span className="font-display text-base font-semibold text-[var(--color-text)]">
                {PERSONAL.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
              {PERSONAL.degree} undergraduate at {PERSONAL.college}. Focused on scalable full-stack architecture and practical AI applications.
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)]">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
                  Skills &amp; Experience
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)]">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/projects" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
                  Featured Projects
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="text-left text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  Resume
                </button>
              </li>
              <li>
                <Link to="/skills#certifications" className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
                  Certifications &amp; Awards
                </Link>
              </li>
              <li>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  GitHub Repositories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)]">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-muted)]">
              <li>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center gap-2 text-[13px] whitespace-nowrap transition-colors hover:text-[var(--color-text)]"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{PERSONAL.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PERSONAL.phone}`}
                  className="inline-flex items-center gap-2 font-mono-tabular transition-colors hover:text-[var(--color-text)]"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{PERSONAL.phone}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{PERSONAL.location}</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soumik Chakraborty on GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soumik Chakraborty on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PERSONAL.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soumik Chakraborty on HackerRank"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--glass-border)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {PERSONAL.name}. Built with React, Vite &amp; Tailwind CSS.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--glass-border)] px-3 py-1.5 font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
