# Distilled Industries

An operator-first Next.js field guide for 15 sectors and 100 specific business models. Industries explains how work, costs, receipts, and capital uses fit together. Funding owns product structures; Solutions owns operating problems and desired outcomes.

## Run locally

Requires Node.js 22 or newer.

```powershell
npm install
npm run dev
```

## Validate and build

```powershell
npm run generate:manifest
npm run check
npm run build
npm run start
npm run audit:routes
```

`npm run check` runs catalog validation, lint, TypeScript, unit tests, and the production build. `npm run audit:routes` expects the local production server at `http://127.0.0.1:3000`; set `AUDIT_BASE_URL` to override it.

## Edit content

Edit `data/industries/catalog.json` as the single editorial content source. Keep the route contract in `CANONICAL-ROUTES.txt` stable unless an approved taxonomy change is made. Then run `npm run generate:manifest` to rebuild `data/industries/routes.manifest.json` and `CANONICAL-SITEMAP.txt`. Run `npm run validate` and `npm test` before review. Do not edit generated route artifacts by hand.

The catalog retains qualitative sector cash-cycle context, business operating units, and specific industry pain points from the legacy seed registry. It removes legacy provider paths, purported underwriting rules, financial performance claims, and an unverified application destination. Content is marked for editorial review; no review date is fabricated.

## Staged indexing

The preview is noindex. Page metadata and the root layout emit `noindex`; the sitemap is intentionally empty. Canonical URLs point to the planned `https://industries.distilledfunding.com` host. Do not enable indexing until the domain, page review, and launch gates are confirmed in a later release. No external service, analytics, intake, or CRM is connected.

## References

`_reference/` contains local, ignored reference checkouts and legacy variations. The production app does not import them or bundle the historical ZIPs. See `docs/REFERENCE-RECONCILIATION.md` for the comparison and content treatment.
