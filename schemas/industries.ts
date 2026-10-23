import { z } from "zod";

const text = z.string().trim().min(1);
const link = z.object({ label: text, href: z.url(), context: text });
const provenance = z.object({
  canonicalSource: text,
  contentSource: text,
  treatment: z.enum(["adapted", "derived", "manual"]),
  notes: text
});
export const sectorSchema = z.object({
  id: text, slug: text, route: z.string().startsWith("/"), canonicalUrl: z.url(), title: text,
  shortTitle: text, summary: z.string().min(40), thesis: z.string().min(40), capitalUses: z.array(text).min(2),
  guideSlugs: z.array(text).min(1), order: z.number().int().positive(), provenance: text,
  reviewStatus: z.enum(["editorial-review-required", "approved"]), lastReviewed: z.iso.date().nullable(), indexStatus: z.enum(["noindex", "index"])
});
export const industrySchema = z.object({
  id: text, sectorId: text, slug: text, route: z.string().startsWith("/"), canonicalUrl: z.url(),
  title: text, shortTitle: text, seoTitle: text, metaDescription: z.string().min(70), eyebrow: text,
  operatorProfile: z.string().min(80), businessModel: z.string().min(80), cashCycle: z.string().min(100),
  revenueDynamics: z.string().min(80), costCenters: z.array(text).min(2), seasonality: z.string().min(40),
  painPoints: z.array(text).min(2), capitalUses: z.array(text).min(2), operationalLevers: z.array(text).min(2),
  readinessQuestions: z.array(text).min(3), documentPreparation: z.array(text).min(3), relatedIndustries: z.array(text),
  fundingConnections: z.array(link).min(1), solutionsConnections: z.array(link).min(1),
  faqs: z.array(z.object({ question: text, answer: z.string().min(50) })).min(2),
  provenance, reviewStatus: z.enum(["editorial-review-required", "approved"]), lastReviewed: z.iso.date().nullable(), indexStatus: z.enum(["noindex", "index"])
});
export const catalogSchema = z.object({
  version: text, canonicalBaseUrl: z.url(), sectors: z.array(sectorSchema), industries: z.array(industrySchema)
});
export type Sector = z.infer<typeof sectorSchema>;
export type Industry = z.infer<typeof industrySchema>;
export type Catalog = z.infer<typeof catalogSchema>;
