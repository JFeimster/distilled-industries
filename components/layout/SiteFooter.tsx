import Link from "next/link";
import { sectors } from "@/lib/industries/catalog";

export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap footer-top">
    <div className="footer-wordmark">DISTILLED<br/><span>INDUSTRIES</span><p>Know the operator model before choosing a path.</p></div>
    <div className="footer-links"><span className="eyebrow">EXPLORE SECTORS</span>{sectors.slice(0, 7).map((sector) => <Link href={sector.route} key={sector.id}>{sector.shortTitle}</Link>)}</div>
    <div className="footer-links"><span className="eyebrow">THE DISTILLED NETWORK</span><a href="https://funding-distilled.vercel.app">Funding ↗</a><a href="https://distilled-solutions.vercel.app">Solutions ↗</a><span>Acquire · planned</span><span>Tools · planned</span></div>
    <div className="footer-links"><span className="eyebrow">FIELD GUIDE</span><Link href="/#industry-finder">Industry Finder</Link><Link href="/#cash-cycle">Cash-cycle explorer</Link><Link href="/real-estate/real-estate-investors">Real-estate investors</Link></div>
  </div><div className="wrap footer-note"><p>General educational information. Capital options, costs, documentation, and provider decisions vary. Nothing here predicts eligibility or guarantees an outcome.</p><p>PREVIEW / NOINDEX · <Link href="/">Back to top ↑</Link></p></div></footer>;
}
