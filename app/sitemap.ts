import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { sectors, industries } from "@/lib/industries/catalog";
import { isIndexable } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [...sectors, ...industries].filter((page) => isIndexable(page, site.allowIndexing === true)).map((page) => ({ url: page.canonicalUrl, lastModified: page.lastReviewed ?? undefined }));
}
