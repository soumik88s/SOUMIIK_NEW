import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, Globe2, GraduationCap } from 'lucide-react';
import { PERSONAL } from '../data/personal';
import { EDUCATION, INTERNSHIPS } from '../data/education';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';

const CORE_TOPICS = [
  'Data Structures and Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Software Engineering',
];

export default function About({ onOpenResume }) {
  useDocumentMeta(
    'About — Soumik Chakraborty',
    'Learn about Soumik Chakraborty’s B.Tech CSBS education at Techno Main Salt Lake, InAmigos Foundation internship, languages, and engineering goals.'
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-purple)]">
          About Me
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Engineering Practical Solutions From Fundamentals to Deployment
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          {PERSONAL.tagline}
        </p>
      </header>

      {/* Introduction & Career Focus */}
      <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:col-span-7">
          <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
            Background &amp; Engineering Approach
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
            {PERSONAL.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--glass-border)] pt-6">
            <Link
              to="/projects"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--color-deep-purple)] px-4 text-xs font-semibold text-white dark:text-[#12101b] transition-opacity hover:opacity-90"
            >
              <span>Inspect My Projects</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex h-10 items-center rounded-xl border border-[var(--glass-border)] px-4 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              View Resume
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2.5 text-[var(--color-purple)]">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[var(--color-text)]">
                Technical Interests &amp; Goals
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              My focus areas span full-stack web architecture, backend API design, relational and document database modeling, and applied AI/NLP systems such as Retrieval-Augmented Generation and semantic search. I am actively preparing for software engineering internships and placement opportunities where strong fundamentals and shipping end-to-end products matter.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2.5 text-[var(--color-purple)]">
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[var(--color-text)]">
                Languages
              </h2>
            </div>
            <ul className="mt-4 divide-y divide-[var(--glass-border)]">
              {PERSONAL.languages.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-medium text-[var(--color-text)]">{lang.name}</span>
                  <span className="text-xs text-[var(--color-muted)]">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Education & Internship Timeline */}
      <ScrollReveal className="mt-14">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-purple)]">
            Timeline
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            Education &amp; Internship Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
              <GraduationCap className="h-4 w-4 text-[var(--color-purple)]" aria-hidden="true" />
              <span>Academic Background</span>
            </div>

            <ol className="relative space-y-4 border-l border-[var(--glass-border)] pl-6">
              {EDUCATION.map((edu) => (
                <li key={edu.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 -left-[29px] h-2.5 w-2.5 rounded-full border-2 border-[var(--color-background)] bg-[var(--color-purple)]"
                  />
                  <div className="glass-panel rounded-2xl p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-[var(--color-text)]">
                        {edu.degree}
                      </h3>
                      <span className="font-mono-tabular text-xs font-medium text-[var(--color-purple)]">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[var(--color-muted)]">
                      {edu.institution} · {edu.metricLabel}: <span className="font-mono-tabular text-[var(--color-text)]">{edu.metricValue}</span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
                      {edu.details}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
              <Briefcase className="h-4 w-4 text-[var(--color-purple)]" aria-hidden="true" />
              <span>Internship Experience</span>
            </div>

            {INTERNSHIPS.map((intern) => (
              <article key={intern.id} className="glass-panel rounded-2xl p-6">
                <div className="font-mono-tabular text-xs font-medium text-[var(--color-purple)]">
                  {intern.period}
                </div>
                <h3 className="mt-1.5 font-display text-lg font-bold text-[var(--color-text)]">
                  {intern.role}
                </h3>
                <p className="text-sm font-medium text-[var(--color-muted)]">
                  {intern.organization}
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[var(--color-muted)]">
                  {intern.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-purple)]" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-display text-base font-bold text-[var(--color-text)]">
                Core Computer Science Knowledge
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-xs text-[var(--color-muted)] sm:grid-cols-2">
                {CORE_TOPICS.map((topic) => (
                  <li key={topic} className="border-b border-[var(--glass-border)] pb-1.5 text-[var(--color-text)]/90">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
