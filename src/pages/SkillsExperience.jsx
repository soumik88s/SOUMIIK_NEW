import { Award, Briefcase, CheckCircle2, Code2, ExternalLink } from 'lucide-react';
import { PERSONAL } from '../data/personal';
import { SKILL_CATEGORIES } from '../data/skills';
import { INTERNSHIPS } from '../data/education';
import { CERTIFICATIONS_AND_ACHIEVEMENTS } from '../data/certifications';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SkillCard } from '../components/SkillCard/SkillCard';
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal';

export default function SkillsExperience() {
  useDocumentMeta(
    'Skills & Experience — Soumik Chakraborty',
    'Technical skills, InAmigos Foundation AI Web Development Internship, NPTEL & HackerRank certifications, and coding competition achievements.'
  );

  const certifications = CERTIFICATIONS_AND_ACHIEVEMENTS.filter(
    (item) => item.type === 'Certification'
  );
  const achievements = CERTIFICATIONS_AND_ACHIEVEMENTS.filter(
    (item) => item.type === 'Achievement'
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-purple)]">
          Capabilities &amp; Credentials
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Technical Skills, Internship &amp; Certifications
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
          Organized by domain and verified project context rather than arbitrary percentage bars.
        </p>
      </header>

      {/* Skills Grid */}
      <section aria-label="Technical skills by category" className="mt-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Internship Experience */}
      <ScrollReveal className="mt-16">
        <div className="mb-6 flex items-center gap-2.5">
          <Briefcase className="h-5 w-5 text-[var(--color-purple)]" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">
            Internship Experience
          </h2>
        </div>

        {INTERNSHIPS.map((intern) => (
          <article key={intern.id} className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--color-text)]">
                  {intern.role} — {intern.organization}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{intern.summary}</p>
              </div>
              <span className="font-mono-tabular text-xs font-semibold text-[var(--color-purple)]">
                {intern.period}
              </span>
            </div>

            <ul className="mt-5 grid grid-cols-1 gap-2.5 border-t border-[var(--glass-border)] pt-5 text-sm text-[var(--color-muted)] md:grid-cols-2">
              {intern.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-purple)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </ScrollReveal>

      {/* Certifications & Achievements */}
      <ScrollReveal className="mt-16" >
        <div id="certifications" className="scroll-mt-24">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-purple)]">
                Verified Credentials
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
                Certifications &amp; Achievements
              </h2>
            </div>

            <a
              href={PERSONAL.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-deep-purple)] hover:underline"
            >
              <Code2 className="h-4 w-4" aria-hidden="true" />
              <span>View HackerRank Profile</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Competition Achievement Highlight */}
          {achievements.map((award) => (
            <div
              key={award.id}
              className="glass-panel mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-purple)]/15 text-[var(--color-deep-purple)]">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-purple)]">
                    Competition Achievement
                  </div>
                  <h3 className="mt-0.5 font-display text-lg font-bold text-[var(--color-text)]">
                    {award.title}
                  </h3>
                </div>
              </div>
              <span className="font-mono-tabular text-xs font-semibold text-[var(--color-text)]">
                {award.status}
              </span>
            </div>
          ))}

          {/* Completed Certifications */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <article key={cert.id} className="glass-panel flex flex-col justify-between rounded-2xl p-5">
                <div>
                  <div className="text-xs font-medium text-[var(--color-muted)]">
                    {cert.issuer} · {cert.status}
                  </div>
                  <h3 className="mt-1.5 font-display text-base font-bold text-[var(--color-text)]">
                    {cert.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
