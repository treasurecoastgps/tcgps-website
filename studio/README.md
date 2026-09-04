# TCGPS Sanity Studio

Content schema for the Treasure Coast Global Property Solutions public marketing site.

## What Sanity manages

- **Team Member** — leadership bios shown on `/team`
- **Property** — general portfolio showcase shown on `/properties` (no deal financials — see the compliance note at the top of `schemaTypes/property.ts`)
- **Event** — investor meetings, educational sessions, networking events shown on the homepage
- **FAQ Item** — questions/answers shown on `/faq`
- **Market Update / Post** — backburner blog/market-update content (not required for launch)
- **Site Settings** — singleton for contact info and social links

## What Sanity does NOT manage

- **Legal pages** (Privacy Policy, Terms of Service, Risk Disclaimer) — these require attorney review before publication and are kept as versioned code (`client/src/pages/public/Privacy.tsx`, `Terms.tsx`, `RiskDisclaimer.tsx`) rather than freely editable CMS content, so legal sign-off is required to change them.
- **Investor-only data** (deal financials, offering targets, distributions, documents) — that belongs to the investor-portal backend (Phase 1-5 of `PLATFORM_ARCHITECTURE.md`), not this public-content CMS.

## Setup

```bash
cd studio
npm install
npx sanity@latest init          # creates the project + dataset, writes projectId to sanity.cli.ts
npm run dev                     # local studio at http://localhost:3333
npm run deploy                  # publishes a hosted studio at <project>.sanity.studio
```

## Status

Schema is designed and ready, but the main site (`client/`) does **not** yet fetch from
Sanity — it launches on the existing static/API seed data (see `server/storage.ts`) per the
launch-week plan. Wiring the frontend to these schemas is a Phase 6 task; the client helper at
`client/src/lib/sanity.ts` is scaffolded for that swap-in when the project is provisioned.
