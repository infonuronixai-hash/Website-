# Vaibhava Tech Website

Server-rendered company website built with NestJS + Handlebars, based on the
Vaibhava Tech company profile (About, Team, Vision & Mission, Technology &
Product Focus, and solution pages for Education/STEM, Agriculture, Extended
Reality, and Enterprise Software), plus a working contact form.

## Run locally

```bash
npm install
npm run start:dev
```

Then open http://localhost:3000

## Contact form

Submissions are validated server-side and persisted to `data/leads.json`
(created automatically). To send them by email instead, wire up `nodemailer`
inside `src/contact/contact.service.ts` with your SMTP credentials.

## Structure

- `src/pages` — static content pages (Home, About, Team, Vision & Mission, Solutions)
- `src/contact` — contact form controller, DTO, and lead-persistence service
- `views` — Handlebars templates
- `public` — CSS/JS/static assets
