import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import {
  PRIMARY_PROJECTS,
  PROJECT_CATEGORIES,
  SECONDARY_PROJECTS,
} from '../data/projects';
import { filterProjects } from '../utils/portfolioLogic';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { Lightbox } from '../components/Lightbox/Lightbox';

export default function Projects() {
  useDocumentMeta(
    'Projects — Soumik Chakraborty',
    'Explore full-stack and AI projects by Soumik Chakraborty including NEXA AI, CVFORGE, AI Career Intelligence System, DevConnect, and Online Scholarship Management System.'
  );

  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredPrimary = filterProjects(PRIMARY_PROJECTS, activeCategory);
  const filteredSecondary = filterProjects(SECONDARY_PROJECTS, activeCategory);

  const handleOpenLightbox = (project) => {
    const idx = filteredPrimary.findIndex((p) => p.id === project.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-purple)]">
          Selected Engineering Work
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Projects Built for Real Workflows
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
          Five primary full-stack and AI applications verified against source repositories and deployments, with interactive preview inspection and architecture notes.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="glass-panel inline-flex flex-wrap items-center gap-1 rounded-xl p-1"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`h-9 rounded-lg px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[var(--color-deep-purple)] text-white dark:text-[#12101b]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="font-mono-tabular text-xs text-[var(--color-muted)]">
          Showing {filteredPrimary.length} primary{' '}
          {filteredPrimary.length === 1 ? 'project' : 'projects'}
          {filteredSecondary.length > 0 ? ` · ${filteredSecondary.length} additional` : ''}
        </p>
      </div>

      {/* Primary Masonry / Asymmetric Grid */}
      {filteredPrimary.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPrimary.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant={index === 0 && activeCategory === 'All' ? 'featured' : 'default'}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel mt-8 rounded-2xl p-8 text-center">
          <p className="text-sm text-[var(--color-muted)]">
            No primary projects matched the selected category.
          </p>
        </div>
      )}

      {/* Additional / Utility Projects (Subordinate Section) */}
      {filteredSecondary.length > 0 && (
        <section className="mt-16 border-t border-[var(--glass-border)] pt-10">
          <h2 className="font-display text-lg font-bold text-[var(--color-text)]">
            Additional &amp; Utility Projects
          </h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Supporting web experiences and lightweight browser tools alongside the five primary builds.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredSecondary.map((proj) => (
              <article
                key={proj.id}
                className="glass-panel flex flex-col justify-between rounded-2xl p-5"
              >
                <div>
                  <div className="text-xs font-medium text-[var(--color-muted)]">
                    {proj.category} · {proj.technologies.join(' · ')}
                  </div>
                  <h3 className="mt-1.5 font-display text-base font-bold text-[var(--color-text)]">
                    {proj.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {proj.shortDescription}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2.5">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[var(--color-deep-purple)] px-3.5 text-xs font-medium text-white dark:text-[#12101b] transition-opacity hover:opacity-90"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] px-3.5 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <Lightbox
        items={filteredPrimary}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
