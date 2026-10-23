import { allRoutes } from "../lib/industries/catalog";
import { site } from "../lib/config";

const base = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
let failures = 0;
for (const route of allRoutes) {
  const response = await fetch(`${base}${route}`);
  const html = await response.text();
  if (response.status !== 200) { console.error(`FAIL ${route} returned ${response.status}`); failures++; continue; }
  if (!html.includes('name="robots"') || !html.includes("noindex")) { console.error(`FAIL ${route} missing noindex metadata`); failures++; }
  if (!html.includes('rel="canonical"') || !html.includes(site.siteUrl)) { console.error(`FAIL ${route} missing canonical metadata`); failures++; }
}
const robots = await fetch(`${base}/robots.txt`);
if (!robots.ok) { console.error(`FAIL robots.txt returned ${robots.status}`); failures++; }
const sitemap = await fetch(`${base}/sitemap.xml`);
const sitemapText = await sitemap.text();
if (!sitemap.ok || /<url>/.test(sitemapText)) { console.error("FAIL noindex sitemap must be empty"); failures++; }
const missing = await fetch(`${base}/this-route-must-not-exist`);
if (missing.status !== 404) { console.error(`FAIL unknown route returned ${missing.status}`); failures++; }
if (failures) { console.error(`HTTP route audit failed with ${failures} issue(s).`); process.exitCode = 1; }
else console.log(`PASS ${allRoutes.length} routes returned 200 with noindex/canonical metadata; unknown route 404; robots and empty sitemap verified.`);
