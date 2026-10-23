"use client";
import { useState } from "react";
import type { Industry } from "@/schemas/industries";

const options = [
  { id: "timing", label: "Timing between cost and collection", question: "Map payment dates, invoice milestones, and recurring commitments before comparing a cash-flow path." },
  { id: "asset", label: "Equipment, inventory, or capacity", question: "Define the asset or input, quote, expected use, and the operating change it is meant to support." },
  { id: "growth", label: "A new location, contract, or expansion", question: "Build a staged budget with opening costs, ramp assumptions, and the current operation's obligations." }
];
export function FieldGuideDiagnostic({ industry }: { industry: Industry }) {
  const [choice, setChoice] = useState(options[0].id);
  const selected = options.find((option) => option.id === choice)!;
  return <section className="diagnostic-card" aria-labelledby="diagnostic-title"><div className="diagnostic-heading"><span className="eyebrow">03 / OPERATOR DECISION CHECK</span><h2 id="diagnostic-title">What decision is in front of you?</h2><p>A short preparation prompt for {industry.shortTitle.toLowerCase()}. No score, profile, or eligibility result.</p></div><div className="diagnostic-body"><div className="choice-list" role="group" aria-label="Choose the decision to prepare for">{options.map((option) => <button type="button" key={option.id} className={`choice-button ${choice === option.id ? "selected" : ""}`} aria-pressed={choice === option.id} onClick={() => setChoice(option.id)}><span className="choice-radio" aria-hidden="true"/>{option.label}</button>)}</div><div className="recommendation"><span className="eyebrow">PREPARE AROUND THIS</span><h3>{selected.label}</h3><p>{selected.question}</p><ul>{industry.readinessQuestions.slice(0, 2).map((question) => <li key={question}>{question}</li>)}</ul></div></div></section>;
}
