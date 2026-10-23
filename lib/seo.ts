import type { Metadata } from "next";
import { site } from "@/lib/config";
import type { Industry, Sector } from "@/schemas/industries";

export function pageMetadata(page?: Industry | Sector): Metadata {
  const title = page && "seoTitle" in page ? page.seoTitle : page?.title ?? "Industry Finder | Distilled Industries";
  const description = page ? ("metaDescription" in page ? page.metaDescription : page.summary) : site.description;
  const url = page?.canonicalUrl ?? site.siteUrl;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url },
    robots: { index: page ? isIndexable(page) : false, follow: true, googleBot: { index: page ? isIndexable(page) : false, follow: true, "max-image-preview": "large" } },
    openGraph: { type: "website", siteName: site.name, title, description, url, images: [{ url: `${site.siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Distilled Industries operator field guides" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${site.siteUrl}/opengraph-image`] }
  };
}
export function isIndexable(page: Industry | Sector, enabled = site.allowIndexing === true) {
  return enabled && page.reviewStatus === "approved" && page.indexStatus === "index" && page.lastReviewed !== null;
}
export function structuredData(page: Industry | Sector | null) {
  const url = page?.canonicalUrl ?? site.siteUrl;
  const breadcrumbs = page ? [{ label: "Home", href: site.siteUrl }, ...( "sectorId" in page ? [{ label: page.sectorId.replaceAll("-", " "), href: `${site.siteUrl}/${page.sectorId}` }] : []), { label: page.title, href: url }] : [{ label: "Home", href: site.siteUrl }];
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": `${site.siteUrl}/#website`, name: site.name, url: site.siteUrl },
    { "@type": page ? ("guideSlugs" in page ? "CollectionPage" : "WebPage") : "WebSite", "@id": `${url}#page`, name: page?.title ?? site.name, description: page && "metaDescription" in page ? page.metaDescription : page?.summary ?? site.description, url, isPartOf: { "@id": `${site.siteUrl}/#website` } },
    { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: item.href })) },
    ...(page && "faqs" in page ? [{ "@type": "FAQPage", mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] : [])
  ] };
}
export const safeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
