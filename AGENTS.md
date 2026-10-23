# Repository instructions

- This repository owns the Industries operator guides. Funding owns financing products and structures; Solutions owns business problems and operating outcomes; Acquire, Tools, and Wix retain their existing destinations and services.
- Keep the approved 116 routes in `CANONICAL-ROUTES.txt`: home, 15 sector hubs, 100 guides. Never add an `/industries/` prefix or silently rename a route.
- `data/industries/catalog.json` is the single editable content source. Update derived manifests with `npm run generate:manifest`; do not hand-edit generated manifests or `CANONICAL-SITEMAP.txt`.
- Preserve the staged noindex policy in `lib/seo.ts`, `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts`. `ALLOW_INDEXING` is not enabled by local environment or default config.
- Use only verified sibling preview routes for network handoffs. Planned Acquire and Tools destinations remain labeled as planned and are not clickable links.
- Diagnostics are local educational prompts. Do not collect personal/business records, create eligibility scores, estimate approval, or transmit data.
- Adapt current Funding/Solutions shell patterns; do not import `_reference/` or legacy archive code into the production app.
- Before finishing local implementation, run `npm run check`, start the production server, run `npm run audit:routes`, and inspect `git diff --check` and `git status`. Do not deploy, configure DNS/Vercel, modify Wix or sibling repos, commit, or push unless separately requested.
