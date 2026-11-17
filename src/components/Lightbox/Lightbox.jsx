import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from 'lucide-react';

export function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;

  useEffect(() => {
    if (!isOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 20);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate((activeIndex - 1 + items.length) % items.length);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate((activeIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const current = items[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${current.name} preview lightbox`}
    >
      <div
        className="fixed inset-0 bg-[#12101b]/75 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="glass-panel relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-[var(--color-surface-elevated)]">
        <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-3.5">
          <div>
            <p className="text-xs font-medium text-[var(--color-muted)]">
              {current.category} · {activeIndex + 1} / {items.length}
            </p>
            <h2 className="font-display text-base font-bold text-[var(--color-text)] sm:text-lg">
              {current.name}
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-[#12101b]">
          <img
            src={current.image}
            alt={current.imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex - 1 + items.length) % items.length)}
                aria-label="Previous project preview"
                className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-[#12101b]/70 text-white backdrop-blur-md transition-colors hover:bg-[#12101b]"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex + 1) % items.length)}
                aria-label="Next project preview"
                className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-[#12101b]/70 text-white backdrop-blur-md transition-colors hover:bg-[#12101b]"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <p className="text-sm text-[var(--color-muted)]">{current.shortDescription}</p>
            <p className="mt-2 text-xs text-[var(--color-text)]/80">
              {current.technologies.join(' · ')}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            {current.liveUrl && (
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[var(--color-deep-purple)] px-4 text-xs font-medium text-white dark:text-[#12101b] transition-opacity hover:opacity-90 whitespace-nowrap"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            <a
              href={current.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] px-4 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)] whitespace-nowrap"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
