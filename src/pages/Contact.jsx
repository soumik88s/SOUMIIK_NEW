import { Code2, ExternalLink, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { PERSONAL } from '../data/personal';
import { FAQS } from '../data/certifications';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Accordion } from '../components/Accordion/Accordion';

export default function Contact() {
  useDocumentMeta(
    'Contact — Soumik Chakraborty',
    'Connect with Soumik Chakraborty for software engineering internships, AI application roles, or technical collaborations.'
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-purple)]">
          Get in Touch
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Let&apos;s Turn Ideas into Impact
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
          Open to software engineering internships, full-stack development roles, AI application projects, and technical collaborations.
        </p>
      </header>

      <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-[var(--color-text)]">
              Direct Contact Channels
            </h2>

            <ul className="mt-4 divide-y divide-[var(--glass-border)] text-sm">
              <li className="py-3">
                <span className="block text-xs text-[var(--color-muted)]">Email</span>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="mt-1 inline-flex items-center gap-2 font-medium break-all text-[var(--color-text)] hover:text-[var(--color-purple)]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[var(--color-purple)]" aria-hidden="true" />
                  <span>{PERSONAL.email}</span>
                </a>
              </li>

              <li className="py-3">
                <span className="block text-xs text-[var(--color-muted)]">Phone</span>
                <a
                  href={`tel:${PERSONAL.phone}`}
                  className="mt-1 inline-flex items-center gap-2 font-mono-tabular font-medium text-[var(--color-text)] hover:text-[var(--color-purple)]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[var(--color-purple)]" aria-hidden="true" />
                  <span>{PERSONAL.phone}</span>
                </a>
              </li>

              <li className="py-3">
                <span className="block text-xs text-[var(--color-muted)]">General Location</span>
                <div className="mt-1 inline-flex items-center gap-2 font-medium text-[var(--color-text)]">
                  <MapPin className="h-4 w-4 shrink-0 text-[var(--color-purple)]" aria-hidden="true" />
                  <span>{PERSONAL.location}</span>
                </div>
              </li>
            </ul>

            <div className="mt-5 grid grid-cols-3 gap-2.5 pt-2">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[var(--glass-border)] text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[var(--glass-border)] text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[var(--glass-border)] text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
                <span>HackerRank</span>
              </a>
            </div>
          </div>

          {/* Privacy-safe General Region Google Maps Embed */}
          <div className="glass-panel overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-3.5">
              <div>
                <h2 className="font-display text-sm font-bold text-[var(--color-text)]">
                  Region Map
                </h2>
                <p className="text-xs text-[var(--color-muted)]">{PERSONAL.location}</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Bankura,+West+Bengal,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-deep-purple)] hover:underline"
              >
                <span>Open Maps</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="h-56 w-full bg-[var(--color-background)]">
              <iframe
                title="General location map of Bankura, West Bengal, India"
                src="https://maps.google.com/maps?q=Bankura,%20West%20Bengal,%20India&t=&z=11&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>

          {/* Integration-Ready Newsletter Notice (Honest - No Fake Confirmations) */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-base font-bold text-[var(--color-text)]">
              Project Updates &amp; Newsletter
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
              Newsletter subscription is integration-ready and awaits an external provider (such as Buttondown, ConvertKit, or Resend) before collecting subscriber addresses. In the meantime, follow new releases directly on GitHub.
            </p>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] px-4 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Follow @soumik88s on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-16">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-purple)]">
            FAQ
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-[var(--color-text)]">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion items={FAQS} />
      </section>
    </div>
  );
}
