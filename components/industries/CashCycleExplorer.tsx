"use client";
import { useState } from "react";

export function CashCycleExplorer() {
  const [payDay, setPayDay] = useState(0);
  const [receiptDay, setReceiptDay] = useState(35);
  const gap = receiptDay - payDay;
  return <section className="cash-explorer" id="cash-cycle" aria-labelledby="cash-cycle-title">
    <div className="cash-copy"><span className="eyebrow">02 / CASH-CYCLE EXPLORER</span><h2 id="cash-cycle-title">See the timing gap.</h2><p>Place a cost date and an expected receipt date on the same simple timeline. This is a calendar exercise, not a cash forecast or financing recommendation.</p><div className="timeline-result"><strong>{gap > 0 ? `${gap} days` : gap === 0 ? "Same day" : `${Math.abs(gap)} days earlier`}</strong><span>{gap > 0 ? "between the outflow and receipt" : gap === 0 ? "between these two events" : "the receipt precedes the cost"}</span></div><small>Formula: expected receipt day − cost payment day. Uses only the dates you enter here.</small></div>
    <div className="timeline-console"><div className="console-top"><span>LOCAL TIMELINE / NO DATA STORED</span><span aria-hidden="true">● ACTIVE</span></div><label htmlFor="cost-day">WHEN IS THE COST PAID? <span>DAY {payDay}</span><input id="cost-day" type="range" min="0" max="90" value={payDay} onChange={(event) => setPayDay(Number(event.target.value))}/></label><label htmlFor="receipt-day">WHEN IS THE RECEIPT EXPECTED? <span>DAY {receiptDay}</span><input id="receipt-day" type="range" min="0" max="120" value={receiptDay} onChange={(event) => setReceiptDay(Number(event.target.value))}/></label><div className="timeline-rail"><span>OUTFLOW <b>DAY {payDay}</b></span><span className="rail-line"/><span>RECEIPT <b>DAY {receiptDay}</b></span></div><p>Use your own invoice, payroll, inventory, or project dates. The tool does not estimate costs, revenue, eligibility, or approval.</p></div>
  </section>;
}
