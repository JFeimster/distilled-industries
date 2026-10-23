import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPage, sectors, industries } from "@/lib/industries/catalog";
import { pageMetadata, safeJsonLd, structuredData } from "@/lib/seo";
import { PageRenderer } from "@/components/industries/PageRenderer";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, ...sectors.map((sector) => ({ slug: [sector.slug] })), ...industries.map((industry) => ({ slug: industry.route.slice(1).split("/") }))];
}
type Props = { params: Promise<{ slug?: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getPage(slug);
  if (!page) return pageMetadata();
  return page.type === "home" ? pageMetadata() : pageMetadata(page.type === "sector" ? page.sector : page.industry);
}
export default async function ContentPage({ params }: Props) {
  const { slug = [] } = await params;
  const page = getPage(slug);
  if (!page) notFound();
  const data = page.type === "home" ? null : page.type === "sector" ? page.sector : page.industry;
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData(data)) }}/><PageRenderer type={page.type} sector={page.type === "sector" ? page.sector : undefined} industry={page.type === "industry" ? page.industry : undefined}/></>;
}
