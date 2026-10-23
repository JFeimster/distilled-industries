import test from "node:test";
import assert from "node:assert/strict";
import { catalogSchema } from "../schemas/industries";
import catalogJson from "../data/industries/catalog.json";
import { allRoutes, getIndustry, getPage, industries, sectors } from "../lib/industries/catalog";
import { isIndexable } from "../lib/seo";

test("catalog follows the fixed 116-route taxonomy", () => {
  assert.equal(catalogSchema.safeParse(catalogJson).success, true);
  assert.equal(allRoutes.length, 116);
  assert.equal(sectors.length, 15);
  assert.equal(industries.length, 100);
  assert.equal(new Set(allRoutes).size, 116);
});
test("every guide resolves under exactly one canonical sector", () => {
  for (const item of industries) {
    assert.equal(getIndustry(item.sectorId, item.slug)?.route, item.route);
    assert.equal(item.route.startsWith("/industries/"), false);
    assert.ok(sectors.some((sector) => item.route.startsWith(`${sector.route}/`)));
  }
});
test("homepage, hubs, guides, and invalid routes resolve distinctly", () => {
  assert.equal(getPage([])?.type, "home");
  assert.equal(getPage(["construction"])?.type, "sector");
  assert.equal(getPage(["construction", "hvac"])?.type, "industry");
  assert.equal(getPage(["construction", "missing"]), undefined);
  assert.equal(getPage(["industries", "construction", "hvac"]), undefined);
});
test("operator details differ and all guides carry preparation and FAQ content", () => {
  assert.equal(new Set(industries.map((item) => item.painPoints[0])).size, 100);
  for (const item of industries) {
    assert.ok(item.operatorProfile.length > 80);
    assert.ok(item.readinessQuestions.length >= 3);
    assert.ok(item.documentPreparation.length >= 3);
    assert.ok(item.faqs.length >= 2);
  }
});
test("regulated, property, ecommerce, and education models retain their distinct cash contexts", () => {
  const find = (route: string) => industries.find((item) => item.route === route)!;
  assert.match(find("/healthcare/dental-practices").revenueDynamics, /payer/i);
  assert.match(find("/ecommerce/shopify-stores").revenueDynamics, /processor|payout/i);
  assert.match(find("/real-estate/rental-property-investors").revenueDynamics, /property-level/i);
  assert.match(find("/education-childcare/nonprofits-community-orgs").revenueDynamics, /restricted funds/i);
});
test("routes preserve noindex and use only verified sibling paths", () => {
  for (const item of industries) {
    assert.equal(item.indexStatus, "noindex");
    assert.ok(item.fundingConnections.every((link) => link.href === "https://funding-distilled.vercel.app/working-capital"));
    assert.ok(item.solutionsConnections.every((link) => link.href === "https://distilled-solutions.vercel.app/improve-cash-flow"));
  }
  for (const item of sectors) assert.equal(isIndexable(item), false);
  for (const item of industries) assert.equal(isIndexable(item), false);
});
