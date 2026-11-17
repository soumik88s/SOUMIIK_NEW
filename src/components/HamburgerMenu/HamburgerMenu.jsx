import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpRight, FileText, Github, Linkedin, X } from 'lucide-react';
import { PERSONAL } from '../../data/personal';

const NAV_ITEMS = [
  { to: '/', label: 'Home', subtitle: 'Overview & Featured Work' },
  { to: '/about', label: 'About', subtitle: 'Journey, Education & Languages' },
  { to: '/projects', label: 'Projects', subtitle: 'Full-Stack & AI Systems' },
  { to: '/skills', label: 'Skills & Experience', subtitle: 'Stack, Internship & Credentials' },
  { to: '/contact', label: 'Contact', subtitle: 'Get in Touch & FAQ' },
];

export function HamburgerMenu({ isOpen, onClose, triggerRef, onOpenResume }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="fixed inset-0 bg-[#12101b]/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="glass-panel relative z-10 flex h-full w-full max-w-md flex-col justify-between overflow-y-auto bg-[var(--color-surface-elevated)] p-6 sm:p-8">
        <div>
          <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#9b8ec4] to-[#514477] text-sm font-bold text-white">
                {PERSONAL.monogram}
              </span>

              <span className="font-display text-sm font-semibold text-[var(--color-text)]">
                Navigation
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Primary pages" className="mt-6 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center rounded-2xl border px-4 py-3.5 transition-all duration-150 ${
                    isActive
                      ? 'border-[var(--color-purple)] bg-[var(--color-purple)]/12 text-[var(--color-text)]'
                      : 'border-transparent hover:border-[var(--glass-border)] hover:bg-[var(--color-purple)]/6 text-[var(--color-text)]'
                  }`
                }
              >
                <div>
                  <span className="font-display text-lg font-semibold">
                    {item.label}
                  </span>

                  <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                    {item.subtitle}
                  </p>
                </div>
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 border-t border-[var(--glass-border)] pt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="flex w-full items-center justify-between rounded-xl bg-[var(--color-deep-purple)] px-4 py-3 text-sm font-medium text-white dark:text-[#12101b] transition-opacity hover:opacity-92"
            >
              <span className="flex items-center gap-2.5">
                <FileText className="h-4 w-4" aria-hidden="true" />
                View &amp; Print Resume
              </span>

              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--glass-border)] pt-5">
          <p className="text-xs text-[var(--color-muted)]">
            {PERSONAL.location}
          </p>

          <a
            href={`mailto:${PERSONAL.email}`}
            className="mt-1 block text-sm font-medium text-[var(--color-text)] hover:underline"
          >
            {PERSONAL.email}
          </a>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
