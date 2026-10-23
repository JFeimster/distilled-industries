"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { industries, sectors } from "@/lib/industries/catalog";

export function IndustryFinder() {
  const [query, setQuery] = useState("");
  const [sectorId, setSectorId] = useState("all");
  const matches = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return industries.filter((item) => (sectorId === "all" || item.sectorId === sectorId) && terms.every((term) => `${item.title} ${item.sectorId} ${item.operatorProfile} ${item.costCenters.join(" ")}`.toLowerCase().includes(term))).slice(0, 8);
  }, [query, sectorId]);
  return <section className="finder-panel" id="industry-finder" aria-labelledby="finder-title">
    <div className="finder-top"><div><span className="eyebrow">01 / INDUSTRY FINDER</span><h2 id="finder-title">What kind of business do you operate?</h2><p>Search the operator model. Filter by sector. Open a field guide built around how that business runs.</p></div><span className="finder-count">100<br/><small>FIELD GUIDES</small></span></div>
    <div className="finder-controls"><label htmlFor="industry-search">INDUSTRY OR OPERATING MODEL<input id="industry-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try HVAC, Shopify, patient visits…" autoComplete="off"/></label><label htmlFor="sector-filter">SECTOR<select id="sector-filter" value={sectorId} onChange={(event) => setSectorId(event.target.value)}><option value="all">All sectors</option>{sectors.map((sector) => <option key={sector.id} value={sector.id}>{sector.shortTitle}</option>)}</select></label></div>
    <div className="finder-results" aria-live="polite"><div className="results-status"><span>{matches.length ? `SHOWING ${matches.length}${matches.length === 8 ? "+" : ""} MATCHES` : "NO MATCHES"}</span><button type="button" className="text-button" onClick={() => { setQuery(""); setSectorId("all"); }}>Reset filters</button></div>{matches.length ? <div className="finder-grid">{matches.map((item) => <Link className="finder-result" href={item.route} key={item.id}><span className="eyebrow">{item.sectorId.replaceAll("-", " ")}</span><strong>{item.title}</strong><span>{item.operatorProfile.split(". ")[1] ?? item.businessModel}</span><b aria-hidden="true">↗</b></Link>)}</div> : <div className="empty-state"><strong>Try a broader term or another sector.</strong><p>Search by the business type, service, platform, or operating unit. A filter with no match will not change your saved data.</p><button type="button" className="button button-paper" onClick={() => { setQuery(""); setSectorId("all"); }}>Show all industries <span aria-hidden="true">→</span></button></div>}</div>
  </section>;
}
