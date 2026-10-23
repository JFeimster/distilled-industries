# Industries content model

Each sector record contains its stable slug and route, summary/thesis, common cost categories, guide membership, provenance, and review gate. Each guide contains operator identity, business model, cash cycle, revenue timing, seasonality, cost centers, operating levers, preparation questions, general document ideas, related Funding/Solutions connections, visible FAQs, and provenance.

Legacy seed data is explicitly identified in the provenance fields. The retained details are qualitative: sector cash-cycle descriptions, industry labels, operating units, common use cases, and specific pressure points. Additional sector-specific adaptations distinguish payer collections in healthcare; channel settlements in ecommerce; property-level rents, operations, and exits; and restricted resources in education and nonprofits. Provider names, application links, documentary mandates, underwriting signals, and unverified financial claims are not carried into the new catalog.

All records remain `editorial-review-required`, `lastReviewed: null`, and noindex. `allowIndexing` is false centrally; a future reviewed page cannot be indexed unless all page and site gates are explicitly changed. This is not an editorial or lender approval state. General document preparation is conditional and does not state that any provider requires a particular item.

## Update workflow

1. Edit `data/industries/catalog.json`.
2. Run `npm run generate:manifest`.
3. Run `npm run validate`, `npm test`, and `npm run check`.
4. Review generated route changes against `CANONICAL-ROUTES.txt`.
