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

## Deploy (free, Render)

This repo includes a `render.yaml` blueprint. On [render.com](https://render.com):
create a Blueprint from this GitHub repo and it will build/run automatically
on the free plan. Note: the free plan's filesystem is ephemeral, so
`data/leads.json` will reset on redeploys/restarts — switch the contact form
to email delivery or an external database for durable storage.

## Structure

- `src/pages` — static content pages (Home, About, Team, Vision & Mission, Solutions)
- `src/contact` — contact form controller, DTO, and lead-persistence service
- `views` — Handlebars templates
- `public` — CSS/JS/static assets
