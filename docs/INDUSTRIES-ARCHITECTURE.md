# Industries architecture

## Rendering

Next.js App Router uses one optional catch-all page for `/`, sector routes, and two-segment industry routes. `generateStaticParams` emits every sector and guide so the 116 pages are statically rendered. Unknown paths resolve to the app's 404 page.

The renderer is split into three experiences: homepage/Industry Finder, sector intelligence hub, and individual Industry Field Guide. Server components render static editorial sections. The Finder, cash-cycle timeline, and decision prompts are small client components with local state only.

## Data and route safety

`data/industries/catalog.json` is the editorial record. Zod contracts in `schemas/industries.ts` validate its structure. `scripts/generate-manifest.ts` derives the route manifest and canonical route listing. `CANONICAL-ROUTES.txt` is the approved migration contract used by validation to catch route drift.

Canonical URLs use the planned Industries host. Verified sibling handoffs stay external to this repo. Planned Acquire and Tools properties are not linked as active destinations.

## SEO and staged launch

Shared metadata sets canonical, OpenGraph, Twitter, and page-level index controls. Indexing requires the central `allowIndexing` switch, a page review approval, an `index` status, and a non-null review date. The current switch is false and every route is marked noindex. The sitemap is empty because no page is approved for indexing. Robots permits crawling so crawlers can observe the noindex directive. Preview hosting, custom domain, and indexing are not configured here.

## Design

The family design uses cream/paper, near-black borders, orange, electric blue, signal lime, Barlow Condensed, and DM Sans. The Industry Finder and cash-cycle map create an Industries-specific information desk rather than copying Funding's product router or Solutions' outcome console.
