# Vaibhava Tech Website

Company website (About, Team, Vision & Mission, Technology & Product Focus,
and solution pages for Education/STEM, Agriculture, Extended Reality, and
Enterprise Software), plus a working contact form. Built as a static site
with a Cloudflare Pages Function for the contact form, backed by Cloudflare
D1.

## Build

```bash
npm install
npm run build
```

This renders the Handlebars templates in `views/` to static HTML in `dist/`
(via `scripts/build.js`) and copies `public/` assets alongside them.

## Run locally

```bash
npm run dev
```

Builds the site and serves it with `wrangler pages dev`, including the
`/api/contact` Function. Requires a local D1 binding — see Deploy below.

## Deploy (free, Cloudflare Pages)

1. Create a D1 database: `npx wrangler d1 create vaibhava-tech-leads`, then
   copy the returned `database_id` into `wrangler.toml`.
2. Run the migration: `npx wrangler d1 execute vaibhava-tech-leads --file=./migrations/0001_create_leads.sql` (add `--remote` to apply it to the production database).
3. In the Cloudflare dashboard, create a Pages project connected to this
   GitHub repo, with build command `npm run build` and output directory
   `dist`.
4. In the Pages project's Settings → Functions → D1 database bindings, bind
   `DB` to the `vaibhava-tech-leads` database.
5. Deploy, then attach your custom domain under the Pages project's Custom
   Domains tab (Cloudflare will tell you the exact DNS record to add).

## Contact form

Submissions are validated and stored in the `leads` table of the D1
database via `functions/api/contact.js`. Query them with:

```bash
npx wrangler d1 execute vaibhava-tech-leads --command="SELECT * FROM leads" --remote
```

## Structure

- `views` — Handlebars templates (source; rendered to static HTML at build time)
- `src/company-content.js` — structured content used by the home page
- `scripts/build.js` — static site generator
- `functions/api/contact.js` — Cloudflare Pages Function handling form submissions
- `migrations` — D1 schema
- `public` — CSS/JS/static assets
