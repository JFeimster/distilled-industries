import fs from "node:fs";
import path from "node:path";
import { catalogSchema } from "../schemas/industries";

const source = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/industries/catalog.json"), "utf8"));
const catalog = catalogSchema.parse(source);
const contract = fs.readFileSync("CANONICAL-ROUTES.txt", "utf8").split(/\r?\n/).filter(Boolean);
const pages = [
  { id: "home", route: "/", canonicalUrl: "https://industries.distilledfunding.com", type: "home" },
  ...catalog.sectors.map((page) => ({ ...page, type: "sector" })),
  ...catalog.industries.map((page) => ({ ...page, type: "industry" }))
];
const fail = (message: string) => { console.error(`FAIL ${message}`); process.exitCode = 1; };
const routes = pages.map((page) => page.route);
const ids = pages.map((page) => page.id);
const sorted = (values: string[]) => [...values].sort();
if (pages.length !== 116) fail(`expected 116 content routes, found ${pages.length}`);
if (catalog.sectors.length !== 15) fail(`expected 15 sector hubs, found ${catalog.sectors.length}`);
if (catalog.industries.length !== 100) fail(`expected 100 industry guides, found ${catalog.industries.length}`);
if (new Set(ids).size !== ids.length) fail("duplicate page IDs");
if (new Set(routes).size !== routes.length) fail("duplicate routes");
if (JSON.stringify(sorted(routes)) !== JSON.stringify(sorted(contract))) fail("catalog routes do not exactly match CANONICAL-ROUTES.txt");
if (routes.some((route) => route.startsWith("/industries/"))) fail("unexpected /industries prefix");
if (catalog.sectors.some((sector) => sector.route !== `/${sector.slug}` || sector.canonicalUrl !== `${catalog.canonicalBaseUrl}${sector.route}`)) fail("sector route or canonical mismatch");
for (const sector of catalog.sectors) {
  const children = catalog.industries.filter((industry) => industry.sectorId === sector.id);
  if (children.length !== sector.guideSlugs.length || children.some((child) => !sector.guideSlugs.includes(child.slug))) fail(`sector membership mismatch: ${sector.id}`);
  if (children.some((child) => child.route !== `${sector.route}/${child.slug}` || child.canonicalUrl !== `${catalog.canonicalBaseUrl}${child.route}`)) fail(`guide route/canonical mismatch: ${sector.id}`);
  if (sector.lastReviewed !== null || sector.reviewStatus !== "editorial-review-required" || sector.indexStatus !== "noindex") fail(`invalid review gate: ${sector.id}`);
}
if (catalog.industries.some((industry) => !catalog.sectors.some((sector) => sector.id === industry.sectorId))) fail("guide references unknown sector");
if (new Set(catalog.industries.map((industry) => industry.painPoints[0])).size !== 100) fail("industry-specific pain descriptions are not unique");
if (catalog.industries.some((industry) => industry.indexStatus !== "noindex" || industry.lastReviewed !== null)) fail("industry review/index gate is open");
const links = catalog.industries.flatMap((industry) => [...industry.fundingConnections, ...industry.solutionsConnections]);
if (links.some((link) => !["https://funding-distilled.vercel.app/working-capital", "https://distilled-solutions.vercel.app/improve-cash-flow"].includes(link.href))) fail("unverified or unapproved ecosystem URL found");
const forbidden = /guaranteed approval|guaranteed funding|approval rate|pre-?approved|instant approval|same-day funding|underwriting score/i;
for (const page of [...catalog.industries, ...catalog.sectors]) {
  if (forbidden.test(JSON.stringify(page))) fail(`unverified financial claim in ${page.route}`);
}
if (!process.exitCode) console.log("PASS catalog schema, route contract, 1+15+100 coverage, relationships, unique operator context, links, review gates, and claim scan.");
