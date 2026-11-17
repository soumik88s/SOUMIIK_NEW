# Soumik Chakraborty — Developer Portfolio

A multi-page React portfolio website for **Soumik Chakraborty** (Full-Stack Developer & AI Application Developer, B.Tech Computer Science and Business Systems at Techno Main Salt Lake).

## Architecture & Pages

- **Home (`/`)**: Split hero with parallax lavender mesh, verified statistics (`tabular-nums`), featured-project carousel, and engineering focus overview.
- **About (`/about`)**: Personal background, education & internship timeline, core CS fundamentals, and spoken languages.
- **Projects (`/projects`)**: Category filters (`All`, `Full Stack`, `AI / ML`, `Web Applications`), expandable architecture notes, live/GitHub links, accessible lightbox, and subordinate utility builds.
- **Skills & Experience (`/skills`)**: Categorized technical skills grounded in shipped work, InAmigos Foundation internship summary, and verified certifications & competition award.
- **Contact (`/contact`)**: Validated contact form with `mailto:` and clipboard handoff, general region map (Bankura, West Bengal, India), integration-ready newsletter notice, and FAQ accordion.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build & Quality Checks

```bash
npm run lint
npm run build
npx --yes tsx --test src/utils/portfolioLogic.test.ts
```

## Resume PDF Integration

No binary resume PDF was supplied in the starter files. An interactive **Resume Viewer & Print-to-PDF** modal is built into the portfolio using verified CV data. To attach an official downloadable static PDF, place your file at:

```text
public/resume/Soumik-Chakraborty-Resume.pdf
```

## Optional Third-Party Integrations

1. **Contact Form Email Delivery**: The Contact form currently validates all fields and prepares an honest `mailto:` launch and clipboard copy. To submit emails silently in the background, connect a form backend such as Formspree, EmailJS, or a custom `/api/contact` SMTP/Resend route.
2. **Newsletter Subscriptions**: Currently displays an integration-ready notice linking to GitHub. Connect Buttondown, ConvertKit, or Resend before enabling email collection.
3. **Interactive Google Maps JS SDK**: Currently uses a standard privacy-safe regional `<iframe>` embed for Bankura, West Bengal, India (requiring zero API keys).

## Deployment (Vercel / Render)

- **Vercel**: Import repository, set Build Command to `npm run build`, Output Directory to `dist`, and add SPA fallback rewrites (`/* -> /index.html`).
- **Render (Static Site)**: Set Build Command to `npm install && npm run build`, Publish Directory to `dist`, and add a rewrite rule `/* -> /index.html` for React Router routes.
