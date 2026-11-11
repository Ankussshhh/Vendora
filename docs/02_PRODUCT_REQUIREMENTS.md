# Product requirements

Status: proposed baseline for pilot implementation. Each requirement needs an implementation status and acceptance evidence in `shared/TASKS.md`.

| ID | Capability | Acceptance condition | Priority |
|---|---|---|---|
| R01 | Merchant account and membership | User only accesses authorized merchants; invitation and role changes are audited | P0 |
| R02 | Catalog and variants | Owner creates/edits product, SKU, variant, price, image and active state; tenant SKU uniqueness enforced | P0 |
| R03 | Inventory | Ledger records increases/decreases/adjustments; reservations prevent oversell under concurrent checkout | P0 |
| R04 | Customer CRM | Timeline joins messages, orders, notes and payment events; tags and follow-up tasks are editable | P0 |
| R05 | Order operations | Draft/confirmed/packing/shipped/delivered/cancelled transitions are guarded; payment and shipment states remain separate | P0 |
| R06 | Payment tracking | Verified signed gateway events reconcile the correct order and amount; duplicates do not double-process | P0 |
| R07 | WhatsApp inbox | Authorized number onboarding, inbound deduplication, outbound statuses, human assignment and handover work | P0 |
| R08 | Buyer AI assistance | Uses live catalog/stock tools; cannot invent price, availability, discount or refund policy | P0 |
| R09 | Voice stock draft | Owner records speech; sees parsed SKU/variant/quantity/add-versus-set intent; confirms once; audit/undo supported | P0 |
| R10 | Usage and credits | Shared AI wallet, action quotes, atomic reservations and idempotent settlement; manual operations require zero AI credits | P0 |
| R11 | Subscription entitlements | Seats/numbers/variant/order limits enforced server-side; existing orders remain readable when limits are reached | P0 |
| R12 | Fulfilment | Packing/dispatch queue and tracking references; pilot may use manual shipping updates with clear labels | P0 |
| R13 | Exports and portability | Authorized owner exports customers/orders with safe field handling and tenant filtering | P0 |
| R14 | Instagram lead capture | Manual source tagging in pilot; live inbox automation only when approved API access is implemented | P1 |
| R15 | Automated follow-ups | Recorded consent, opt-out, category/template selection and spend preview; no unauthorized campaign sends | P1 |
| R16 | Image recognition | Bounded image analysis matches catalog candidates, shows uncertainty and uses quoted credits | P1 |
| R17 | Product photography | User previews generation cost and approves; variants billed explicitly; product appearance preserved | P2 |
| R18 | Analytics | Orders/collected payments/fulfilment and usage metrics reconcile with source records | P1 |
| R19 | Multi-location and advanced API | Location-scoped stock and signed integrations; subject to separate milestone | P2 |

P0 means proposed pilot core, not immediate permission to implement everything. Human fallback/manual integration can be explicit for a limited pilot, but do not label mock events as live.

## Operational constraints

- Tenancy, payment correctness, stock correctness and credit integrity are release blockers.
- No LLM call is needed for ordinary list/filter/edit operations.
- Tenant-local currencies and timezones must not be inferred from browser language.
- Drafts, empty states, failure recovery, accessible keyboard navigation and mobile layouts are part of the workflow.
- Proposed pilot targets: 99.5% monthly availability, p95 non-AI interactive API response under 1 second at agreed pilot load, visible AI progress/fallback within 15 seconds. These are internal test targets, not contractual SLAs; validate capacity before promising them.
- Avoid blocking webhook acknowledgements on AI work. Define provider-specific acknowledgement deadlines from current official documentation.
