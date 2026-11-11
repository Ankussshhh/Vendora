# Proposed roadmap

No dates promised. Start only the milestone requested by Ankush.

| Stage | Scope | Exit evidence |
|---|---|---|
| 0 — Repository and decisions | Inspect existing code, document stack/schema/deployment and gaps; select initial segment/providers | Evidence-backed inventory and selected next task |
| 1 — Merchant operations | Tenancy/auth, catalog/variants, stock ledger, CRM, order queue | Correct manual workflow and tenant isolation |
| 2 — Billing foundation | Plan config, AI ledger/reservations, usage views, mock provider cost tracking | Concurrency/retry/expiry tests pass |
| 3 — Voice administration | Transcription adapter, extraction, editable draft, confirm/audit | Mixed-language evaluation and correction metrics |
| 4 — Conversational selling | Official WhatsApp ingress/outbox, buyer AI, catalog lookup, handover | Deduplicated messages, capped costs, live pilot test |
| 5 — Verified payment and fulfilment | Payment adapter/webhooks, stock lifecycle, dispatch/tracking | Replay/late-payment/refund scenarios verified |
| 6 — Paid pilot | Scoped onboarding, actual rate reconciliation, support/runbooks | Renewal, usage, cost and ROI evidence |
| 7 — Expansion | Instagram integration, images, follow-ups, multi-location and regional pricing | Separate approved requirements and measurable demand |

Stages may be reordered for an existing repository; never implement paid AI execution without a working cap/reservation mechanism. Pilot activation requires a complete end-to-end workflow even if some labelled manual steps remain.

## Customer validation

Interview 25 sellers in two categories; inspect anonymized workflow examples; seek 10 paid pilots; measure second renewal and weekly CRM use. Proposed decision thresholds from research: 7/10 initial renewals, 60% weekly operations use, 60%+ measured contribution margin and acquisition payback under four months. These are hypotheses/decision thresholds, not benchmark guarantees. Track all-in merchant cost and incremental profit/time savings.
