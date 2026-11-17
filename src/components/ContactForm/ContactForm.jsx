import { useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { PERSONAL } from '../../data/personal';
import { buildMailtoHref, validateContactForm } from '../../utils/portfolioLogic';

export function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [validatedSubmission, setValidatedSubmission] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (validatedSubmission) {
      setValidatedSubmission(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateContactForm(values);
    if (!result.isValid) {
      setErrors(result.errors);
      setValidatedSubmission(null);
      return;
    }

    setErrors({});
    setValidatedSubmission(result.sanitized);
  };

  const handleCopyMessage = async () => {
    if (!validatedSubmission) return;
    const text = `To: ${PERSONAL.email}\nSubject: [Portfolio Inquiry] ${validatedSubmission.subject}\nFrom: ${validatedSubmission.name} (${validatedSubmission.email})\n\n${validatedSubmission.message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
        Send a Message
      </h2>
      <p className="mt-1.5 text-sm text-[var(--color-muted)]">
        Complete the validated form below to prepare a direct email handoff. No automated mail relay is configured on this static client, so your message is never silently discarded.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-semibold text-[var(--color-text)]"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={handleChange('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              placeholder="e.g. Priya Sharma"
              className="mt-1.5 w-full rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/60"
            />
            {errors.name && (
              <p id="contact-name-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-semibold text-[var(--color-text)]"
            >
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              placeholder="you@company.com"
              className="mt-1.5 w-full rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/60"
            />
            {errors.email && (
              <p id="contact-email-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-semibold text-[var(--color-text)]"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange('subject')}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            placeholder="Internship opportunity, collaboration, or project inquiry"
            className="mt-1.5 w-full rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/60"
          />
          {errors.subject && (
            <p id="contact-subject-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold text-[var(--color-text)]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="Share details about the role, team, or project..."
            className="mt-1.5 w-full rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/60"
          />
          {errors.message && (
            <p id="contact-message-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--color-deep-purple)] px-5 text-sm font-medium text-white dark:text-[#12101b] transition-opacity hover:opacity-92"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>Validate &amp; Prepare Email</span>
        </button>
      </form>

      {validatedSubmission && (
        <div
          aria-live="polite"
          className="mt-6 rounded-2xl border border-[var(--color-purple)]/40 bg-[var(--color-purple)]/10 p-5"
        >
          <p className="font-display text-sm font-bold text-[var(--color-text)]">
            Inquiry Ready to Send
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
            Your message passed validation. Because no SMTP or Formspree endpoint is connected in this environment, launch your email client directly or copy the formatted message below.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <a
              href={buildMailtoHref(PERSONAL.email, validatedSubmission)}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[var(--color-deep-purple)] px-4 text-xs font-medium text-white dark:text-[#12101b] transition-opacity hover:opacity-90"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Open in Email App</span>
            </a>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface)] px-4 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Formatted Message</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
