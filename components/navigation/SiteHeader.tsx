"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sectors } from "@/lib/industries/catalog";

const groups = [
  { label: "Build & Trade", routes: ["construction", "transportation", "manufacturing", "automotive"] },
  { label: "Commerce & Service", routes: ["retail", "ecommerce", "restaurants", "home-services", "beauty-wellness"] },
  { label: "People & Professional", routes: ["healthcare", "professional-services", "education-childcare"] },
  { label: "Property & Hospitality", routes: ["real-estate", "hospitality", "agriculture"] }
];
const ecosystem = [
  { label: "Funding", href: "https://funding-distilled.vercel.app" },
  { label: "Solutions", href: "https://distilled-solutions.vercel.app" },
  { label: "Industries", href: "/" },
  { label: "Acquire", href: null }, { label: "Tools", href: null }
];

export function SiteHeader() {
  const [active, setActive] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const close = () => { setActive(null); setMobile(false); };
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) close(); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return <header className="site-header" ref={header} onKeyDown={(event) => {
    if (event.key === "Escape") { if (mobile) mobileTrigger.current?.focus(); else if (active !== null) triggers.current[active]?.focus(); close(); }
  }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}>
    <div className="utility-bar"><div className="wrap"><span>INDUSTRY CAPITAL INTELLIGENCE DESK</span><span>OPERATOR CONTEXT / CAPITAL DECISIONS</span></div></div>
    <div className="header-main wrap">
      <Link href="/" className="brand" aria-label="Distilled Industries home" onClick={close}><span className="brand-mark" aria-hidden="true">d<span>i</span></span><span>DISTILLED<span>INDUSTRIES</span></span></Link>
      <nav id="primary-navigation" className={`primary-nav ${mobile ? "mobile-open" : ""}`} aria-label="Industry sectors">
        {groups.map((group, index) => <div className="nav-group" key={group.label}>
          <button ref={(node) => { triggers.current[index] = node; }} className="nav-trigger" aria-expanded={active === index} aria-controls={`sector-menu-${index}`} onClick={() => setActive(active === index ? null : index)}>{group.label}<span aria-hidden="true">{active === index ? "−" : "+"}</span></button>
          <div className="mega-menu" id={`sector-menu-${index}`} hidden={active !== index}><div className="wrap mega-inner"><div><span className="eyebrow">SECTOR INDEX / 0{index + 1}</span><p>Choose a business model to see its operating context.</p><Link href="/#industry-finder" className="text-link" onClick={close}>Search all industries →</Link></div><ul>{group.routes.map((slug) => { const sector = sectors.find((item) => item.slug === slug)!; return <li key={slug}><Link href={sector.route} onClick={close}>{sector.shortTitle}<span>{sector.guideSlugs.length} guides ↗</span></Link></li>; })}</ul></div></div>
        </div>)}
      </nav>
      <div className="ecosystem-links">{ecosystem.map((item) => item.href ? <a key={item.label} href={item.href}>{item.label}{item.label !== "Industries" && <span aria-hidden="true"> ↗</span>}</a> : <span className="planned-link" key={item.label} aria-label={`${item.label} planned`}>{item.label}<small> planned</small></span>)}</div>
      <Link href="/#industry-finder" className="button button-orange header-cta" onClick={close}>Find your industry <span aria-hidden="true">↗</span></Link>
      <button className="mobile-toggle" ref={mobileTrigger} aria-label={mobile ? "Close navigation" : "Open navigation"} aria-expanded={mobile} aria-controls="primary-navigation" onClick={() => { setMobile(!mobile); setActive(null); }}>{mobile ? "×" : "☰"}</button>
    </div>
  </header>;
}
