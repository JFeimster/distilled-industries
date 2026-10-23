import fs from "node:fs";
import path from "node:path";
import { catalogSchema } from "../schemas/industries";

const catalogPath = path.join(process.cwd(), "data/industries/catalog.json");
const catalog = catalogSchema.parse(JSON.parse(fs.readFileSync(catalogPath, "utf8")));
const all = [
  { id: "home", route: "/", pageType: "home", title: "Industry Finder" },
  ...catalog.sectors.map(({ id, route, title }) => ({ id, route, pageType: "sector", title })),
  ...catalog.industries.map(({ id, route, title }) => ({ id, route, pageType: "industry", title }))
];
fs.writeFileSync("data/industries/routes.manifest.json", `${JSON.stringify(all, null, 2)}\n`);
fs.writeFileSync("CANONICAL-SITEMAP.txt", `${all.map(({ route }) => `${catalog.canonicalBaseUrl}${route === "/" ? "" : route}`).join("\n")}\n`);
console.log(`Generated route manifest for ${all.length} pages.`);
