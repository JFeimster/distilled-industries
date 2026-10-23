import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: true } };
export default function NotFound() { return <section className="not-found wrap"><span className="eyebrow">ROUTE NOT IN THE INDUSTRY INDEX</span><h1>Page not found.</h1><p>This address does not match one of the approved Industry routes.</p><Link className="button button-orange" href="/">Return to Industry Finder <span aria-hidden="true">↗</span></Link></section>; }
