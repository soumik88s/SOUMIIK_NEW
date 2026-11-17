/**
 * Pure domain logic for filtering projects, computing verified portfolio statistics,
 * validating contact form submissions, and formatting mailto handoff URLs.
 */

export function filterProjects(projects, category) {
  if (!Array.isArray(projects)) return [];
  if (!category || category === 'All') return projects;
  return projects.filter(
    (project) =>
      project.category === category ||
      (Array.isArray(project.secondaryCategories) && project.secondaryCategories.includes(category))
  );
}

export function computePortfolioStats({ primaryProjects, secondaryProjects, credentials, cgpa }) {
  const totalProjects =
    (Array.isArray(primaryProjects) ? primaryProjects.length : 0) +
    (Array.isArray(secondaryProjects) ? secondaryProjects.length : 0);
  const certificationCount = Array.isArray(credentials)
    ? credentials.filter((c) => c.type === 'Certification').length
    : 0;
  const achievementCount = Array.isArray(credentials)
    ? credentials.filter((c) => c.type === 'Achievement').length
    : 0;

  return {
    cgpa: Number(cgpa) || 0,
    primaryProjectCount: Array.isArray(primaryProjects) ? primaryProjects.length : 0,
    totalProjects,
    certificationCount,
    achievementCount,
    totalCredentials: certificationCount + achievementCount,
  };
}

export function validateContactForm(fields) {
  const errors = {};
  const name = (fields?.name || '').trim();
  const email = (fields?.email || '').trim();
  const subject = (fields?.subject || '').trim();
  const message = (fields?.message || '').trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (subject.length < 3) {
    errors.subject = 'Please provide a brief subject (at least 3 characters).';
  }
  if (message.length < 15) {
    errors.message = 'Please write a message of at least 15 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: { name, email, subject, message },
  };
}

export function buildMailtoHref(recipientEmail, { name, email, subject, message }) {
  const safeRecipient = (recipientEmail || '').trim();
  const body = `Name: ${name}\nReply-To: ${email}\n\n${message}`;
  const params = new URLSearchParams({
    subject: `[Portfolio Inquiry] ${subject}`,
    body,
  });
  return `mailto:${safeRecipient}?${params.toString()}`;
}
