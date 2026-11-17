import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github, Maximize2 } from 'lucide-react';

export function ProjectCard({ project, onOpenLightbox, variant = 'default' }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isFeatured = variant === 'featured';

  return (
    <article
      className={`glass-panel group overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1 ${
        isFeatured ? 'md:col-span-2 md:grid md:grid-cols-12 md:items-stretch' : 'flex flex-col'
      }`}
    >
      <div
        className={`relative w-full overflow-hidden border-[var(--glass-border)] bg-[var(--color-background)] ${
          isFeatured
            ? 'aspect-video border-b md:col-span-7 md:aspect-auto md:min-h-[300px] md:border-r md:border-b-0'
            : 'aspect-video border-b'
        }`}
        style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
      >
        {!imgError && project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.02] ${
              project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
            }`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#9b8ec4]/25 via-[#7c6daa]/15 to-transparent p-6 text-center">
            <span className="font-display text-lg font-semibold text-[var(--color-text)]">
              {project.name}
            </span>
            <span className="mt-1 text-xs text-[var(--color-muted)]">{project.subtitle}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpenLightbox?.(project)}
          aria-label={`Inspect ${project.name} preview in lightbox`}
          className="absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-[#12101b]/75 text-white backdrop-blur-md transition-opacity duration-150 hover:bg-[#12101b]"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${isFeatured ? 'md:col-span-5 md:p-7' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[var(--color-muted)]">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.subtitle}</span>
        </div>

        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
          {project.name}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.shortDescription}
        </p>

        <p className="mt-4 border-t border-[var(--glass-border)] pt-3 text-xs leading-relaxed text-[var(--color-text)]/85">
          {project.technologies.join(' · ')}
        </p>

        {expanded && (
          <div className="mt-4 space-y-3 border-t border-[var(--glass-border)] pt-4 text-sm">
            <p className="leading-relaxed text-[var(--color-muted)]">{project.longDescription}</p>
            <ul className="space-y-1.5 text-xs text-[var(--color-text)]/90">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-purple)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[var(--color-deep-purple)] px-4 text-xs font-medium text-white dark:text-[#12101b] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface-elevated)] px-4 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)] whitespace-nowrap shrink-0"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="ml-auto inline-flex h-10 items-center gap-1 rounded-xl px-3 text-xs font-medium text-[var(--color-purple)] transition-colors hover:bg-[var(--color-purple)]/10 whitespace-nowrap shrink-0"
          >
            <span>{expanded ? 'Hide details' : 'Details'}</span>
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
