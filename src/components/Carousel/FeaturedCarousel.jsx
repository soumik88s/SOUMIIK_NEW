import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2 } from 'lucide-react';

export function FeaturedCarousel({ projects, onOpenLightbox }) {
  const [index, setIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const current = projects[index];
  const prevSlide = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const nextSlide = () => setIndex((i) => (i + 1) % projects.length);

  return (
    <div
      className="glass-panel overflow-hidden rounded-2xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects showcase"
    >
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-background)] lg:col-span-7 lg:aspect-auto lg:min-h-[340px]">
          <img
            src={current.image}
            alt={current.imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onOpenLightbox?.(current)}
            aria-label={`Expand ${current.name} preview`}
            className="absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-[#12101b]/75 text-white backdrop-blur-md transition-opacity hover:bg-[#12101b]"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-medium text-[var(--color-muted)]">
              <span>{current.category}</span>
              <span className="font-mono-tabular">
                0{index + 1} / 0{projects.length}
              </span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--color-text)]">
              {current.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-[var(--color-purple)]">
              {current.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              {current.shortDescription}
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-[var(--color-text)]/90">
              {current.highlights.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-purple)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 border-t border-[var(--glass-border)] pt-3 text-xs text-[var(--color-muted)]">
              {current.technologies.slice(0, 6).join(' · ')}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--glass-border)] pt-5">
            <div className="flex items-center gap-2">
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
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] px-3.5 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)] whitespace-nowrap"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous featured project"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next featured project"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-[var(--glass-border)] px-4 py-3">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => setIndex(idx)}
            aria-label={`Show slide ${idx + 1}: ${proj.name}`}
            aria-current={idx === index ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-200 ${
              idx === index
                ? 'w-7 bg-[var(--color-deep-purple)]'
                : 'w-2 bg-[var(--color-lavender)]/50 hover:bg-[var(--color-purple)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
