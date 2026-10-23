import rawCatalog from "@/data/industries/catalog.json";
import { catalogSchema, type Industry, type Sector } from "@/schemas/industries";

export const catalog = catalogSchema.parse(rawCatalog);
export const sectors: Sector[] = catalog.sectors;
export const industries: Industry[] = catalog.industries;
export const routeManifest = [...sectors, ...industries];
export const getSector = (slug: string) => sectors.find((sector) => sector.slug === slug);
export const getIndustry = (sectorSlug: string, slug: string) => industries.find((industry) => industry.sectorId === sectorSlug && industry.slug === slug);
export const getPage = (segments: string[]) => {
  if (!segments.length) return { type: "home" as const };
  if (segments.length === 1) {
    const sector = getSector(segments[0]);
    return sector ? { type: "sector" as const, sector } : undefined;
  }
  if (segments.length === 2) {
    const industry = getIndustry(segments[0], segments[1]);
    return industry ? { type: "industry" as const, industry } : undefined;
  }
  return undefined;
};
export const allRoutes = ["/", ...routeManifest.map((page) => page.route)];
export function getBreadcrumbs(sector: Sector, industry?: Industry) {
  const crumbs = [{ label: "Home", href: "/" }, { label: sector.shortTitle, href: sector.route }];
  if (industry) crumbs.push({ label: industry.shortTitle, href: industry.route });
  return crumbs;
}
