# Vendora implementation kickoff contract

Prepared: 11 November 2026  
Status: **Pre-kickoff proposal — implementation is not yet authorized**

This document converts the wider Vendora planning pack into one reviewable first milestone. It does not approve a stack, provider, deployment, spend, customer contact, production data use, or public rebrand.

## 1. How to read this document

Each material statement has one of these statuses:

- **Approved** — explicitly confirmed by Ankush or recorded as accepted in `shared/DECISIONS.md`.
- **Assumed** — a reversible planning default. It may guide estimates and design, but it is not permission to make an irreversible or production choice.
- **Open** — a decision is still required before the named gate.

Authority order: Ankush's latest explicit instruction → accepted entries in `shared/DECISIONS.md` → this milestone contract → product documents under `docs/` → dated research.

`shared/DECISIONS.md` remains the source of truth for accepted decisions. This file owns the proposed scope and completion contract for Milestone 1 only.

## 2. Product hypothesis

### Confirmed direction

- **Approved:** Vendora is a merchant workspace for CRM, orders, WhatsApp selling, AI recommendations, and voice-assisted product/stock administration.
- **Approved:** Vendora is the working name. Domain and trademark availability are not confirmed.
- **Approved:** Claude implements after authorization; Codex reasons and reviews.

### Pilot hypothesis to validate

- **Assumed persona:** an India-based, owner-operated apparel/accessories seller with one to five staff, selling primarily through Instagram and WhatsApp.
- **Assumed ranked pain:** conversations, customer context, variant stock, and order status are split across chat and manual records, causing missed follow-ups and fulfilment mistakes.
- **Assumed job to be done:** “When a buyer messages me, help my team turn that conversation into a correct, trackable order without losing customer context or overselling stock.”
- **Open hypothesis:** at least one complete conversation-to-order workflow will save meaningful admin time and reduce order/stock mistakes enough that merchants use Vendora weekly and will pay for it.

The persona and pain statement must be confirmed or replaced before a paid pilot. They may be used as reversible design assumptions for a local prototype only after implementation is authorized.

## 3. Scope cut line

The existing P0 list is pilot scope, not one coding task. It is divided here to prevent the first milestone from expanding into the whole product.

### P0a — Milestone 1: mock chat to reserved order

**Assumed scope:** a merchant can sign in to a local/test environment, create a product and variants with opening stock, receive a clearly labelled simulated inbound message, create/link a CRM customer, create an order from the conversation, reserve stock transactionally, and move the order through the milestone's guarded states. The customer timeline and inventory ledger reflect those actions.

Included requirements:

- R01: minimum merchant membership and server-authorized roles needed by this slice.
- R02: product, variant, SKU, price, currency, and active state.
- R03: append-only inventory adjustments and stock reservations.
- R04: customer identity, conversation/order timeline, and a basic note.
- R05: draft/confirmed/cancelled order operations needed by the demo.
- R07: mock inbound channel and conversation assignment only; no live WhatsApp.

### P0b — recommended next slices

- Voice stock draft using typed/pasted transcript text before adding a transcription provider.
- AI quote/reserve/settle foundation before any paid AI execution.
- Official WhatsApp sandbox ingress/outbox and human handover after the access model is selected.

### P0c — later pilot completion

- Buyer AI against live catalog/stock tools.
- Verified merchant payment collection and payment reconciliation.
- Packing/dispatch workflow, subscription entitlements, exports, and operational readiness.
- Remaining P0 acceptance conditions from `docs/02_PRODUCT_REQUIREMENTS.md`.

### Explicit Milestone 1 non-goals

- Live WhatsApp, Instagram, payment, shipping, AI, image, or transcription providers.
- AI credits, top-ups, subscription billing, published prices, or provider rate calculation.
- Voice/audio capture, automated replies, campaigns, refunds, returns, or stock restocking.
- Production deployment, production identity provider, real merchants, or real customer data.
- Multi-location stock, backorders, fractional quantities, multi-currency UI, tax calculation, or localization.
- Data migration, public rename, domain purchase, trademark filing, or customer communication.

## 4. Kickoff gates

Implementation starts only when every K0 item is satisfied.

| Gate | Requirement | Status | Evidence needed |
|---|---|---|---|
| K0.1 | Ankush explicitly authorizes Milestone 1 | Open | Written instruction to start |
| K0.2 | Actual source repository/location is identified | Open | Repository path and baseline inspection |
| K0.3 | Existing stack is documented, or a new-stack ADR is approved | Open | Repository inventory or accepted decision |
| K0.4 | Persona and Milestone 1 scope are accepted or corrected | Open | Decision log entry |
| K0.5 | Order and reservation rules below are accepted for the milestone | Open | Decision log entry |
| K0.6 | Demo script and Definition of Done are accepted | Open | Kickoff approval or corrections |

No provider, legal, pricing, or production-hosting decision blocks a local mock milestone. Those decisions do block the relevant integration or pilot gate.

## 5. Proposed domain rules for Milestone 1

### Invariants

- **Approved direction:** every merchant-owned read and write is server-authorized and tenant-scoped.
- **Approved direction:** stock history is append-only; corrections create compensating entries.
- **Approved direction:** concurrent reservations cannot make available stock negative under the no-backorder policy.
- **Approved direction:** order lines preserve SKU, description, unit price, quantity, and currency snapshots.
- **Assumed:** inventory is integer units and backorders are disabled.
- **Assumed:** money is stored as integer minor units with an explicit currency; Milestone 1 displays one merchant currency only.
- **Assumed:** idempotency is scoped to merchant + operation + client key. Reusing a key with a different normalized payload returns a conflict.
- **Open:** reservation expiry duration and whether draft orders reserve immediately or only on confirmation.

### Order transitions

Only the following transitions are in Milestone 1. Every transition is validated on the server and audited.

| From | To | Proposed guard | Status |
|---|---|---|---|
| none | draft | Customer and at least one valid line; totals calculated by server | Assumed |
| draft | confirmed | Required buyer/order fields present and stock reservation active | Assumed |
| draft | cancelled | Cancellation reason recorded; active reservation released once | Assumed |
| confirmed | cancelled | Allowed only before packing; reason recorded; reservation released once | Assumed |

Packing, shipped, delivered, returns, and payment-driven transitions are deliberately deferred. A later milestone must extend rather than silently replace this state machine.

### Reservation transitions

| From | To | Proposed trigger | Status |
|---|---|---|---|
| none | active | Atomic availability check and reservation creation | Assumed |
| active | consumed | Later fulfilment rule; not exercised in Milestone 1 | Open |
| active | released | Order cancellation or authorized manual release | Assumed |
| active | expired | Expiry worker after the approved TTL | Open |

Every release/expiry is idempotent. The available quantity is derived consistently from the ledger and active reservations; it is never trusted from a browser calculation.

### Payment state

Payments are out of scope. Milestone 1 may show `not_configured` or omit payment UI entirely. It must not use a fake “paid” state that could later be mistaken for a verified provider event.

## 6. Proposed roles and tenant enforcement

The full role model remains owner, admin, sales, fulfilment, and viewer. The first implementation may seed only the roles needed by the demo, but authorization must not be a client-only flag.

| Action | Owner | Admin | Sales | Fulfilment | Viewer |
|---|---:|---:|---:|---:|---:|
| Manage membership/roles | Yes | Open | No | No | No |
| Create/edit catalog | Yes | Yes | Open | No | No |
| Adjust stock | Yes | Yes | No | Open | No |
| Read customers/conversations | Yes | Yes | Yes | Minimum needed | Yes |
| Add CRM note | Yes | Yes | Yes | No | No |
| Create/confirm/cancel order | Yes | Yes | Yes | Open | No |
| Read audit history | Yes | Yes | Own actions only | Own actions only | No |

All cells marked Open require a product decision before that permission is implemented. The technical enforcement mechanism—database row-level security, a mandatory scoped repository/service layer, composite tenant foreign keys, or a combination—must be recorded after the actual stack is inspected. Whatever mechanism is chosen must have cross-tenant negative tests on every merchant-facing endpoint.

## 7. Milestone 1 experience

### Minimum screen inventory

1. Test sign-in and merchant context.
2. Catalog list plus product/variant editor.
3. Inventory view and manual opening-stock adjustment.
4. Mock inbox/conversation with an obvious “Test channel” label.
5. Customer timeline.
6. Order composer and order detail.
7. Audit/history view sufficient to inspect stock and order events.

### Demo script

1. Sign in as an authorized user for Merchant A.
2. Create a T-shirt product with two size variants, prices, SKUs, and opening stock.
3. Inject a simulated inbound buyer message into the test channel.
4. Create or link the customer and open the resulting timeline.
5. Create a draft order for the last unit of one variant.
6. Submit two concurrent reservation attempts and show that exactly one succeeds.
7. Retry the successful order request with the same idempotency key and show that no duplicate is created.
8. Confirm the order and show the customer timeline, order history, and available-stock result.
9. Attempt an illegal state transition and show a safe server rejection.
10. Sign in under Merchant B and prove that Merchant A's customer, order, and stock are neither readable nor writable.

UX expectations: responsive at common phone widths, keyboard-operable core forms, visible validation/loading/error states, and no live-looking treatment for mocks.

## 8. Milestone 1 data and API boundary

Minimum logical records, adapted to the inspected stack:

- Merchant, User, Membership.
- Customer and CustomerIdentity.
- Conversation, Message, and CRMNote.
- Product and Variant.
- InventoryLedger and StockReservation.
- Order, OrderLine, and AuditEvent.
- InboundEvent or equivalent mock-event record for deduplication.

Minimum write behaviors:

- Create/update product and variants with tenant-unique SKU enforcement.
- Create a manual inventory adjustment with reason and idempotency key.
- Inject/deduplicate a mock inbound message.
- Create/link customer identity within the channel account/test channel.
- Create an order and reserve stock atomically.
- Perform guarded order transitions.

Exact routes, framework patterns, identifiers, schema names, idempotency retention, and event transport are implementation decisions after repository inspection. Browser-supplied `merchant_id` is never sufficient authorization.

## 9. Verification and Definition of Done

Milestone 1 is complete only when all applicable items below have actual recorded evidence.

### Required automated checks

- Tenant A cannot read, write, enumerate, export, or infer Tenant B records through every implemented endpoint.
- Two concurrent attempts for the last unit result in at most one active reservation.
- A repeated order request with the same idempotency key creates one order; the same key with different input conflicts.
- Inventory ledger and active reservations reconcile to the displayed available stock.
- Cancelling/retrying release does not restore stock twice.
- Illegal order and reservation transitions fail without partial writes.
- Duplicate mock inbound events produce one logical message/effect.
- Order snapshots do not change after a catalog edit.
- Permission denials cover every implemented role/action pair.

### Required human checks

- The clean setup/seed instructions reproduce the demo script.
- Core screens work at phone and desktop widths with keyboard navigation.
- Empty, loading, validation, conflict, and unexpected-error states are honest and recoverable.
- Mock channel indicators are visible in UI, fixtures, and logs.
- No secrets or real customer data appear in source, fixtures, screenshots, logs, or docs.

### Completion evidence

- Appropriate formatting, type, lint, unit, integration, and end-to-end commands actually run and their results are recorded.
- Schema migrations include rollback/recovery notes appropriate to the chosen stack.
- Changed files, assumptions, unresolved risks, and review requests are written to `shared/HANDOFF.md` using `templates/IMPLEMENTATION_HANDOFF.md`.
- `shared/TASKS.md`, `shared/CHANGELOG.md`, affected contracts, and decisions are updated.
- Codex reviews tenant isolation, stock correctness, idempotency, scope, and evidence before the milestone is called done.

## 10. Decision register for kickoff

This table routes decisions; accepted outcomes must be copied to `shared/DECISIONS.md`.

| ID | Decision | Proposed default | Owner | Needed by | Blocks |
|---|---|---|---|---|---|
| K01 | Confirm primary persona and ranked pain | India apparel/accessories seller described above | Ankush | Before UX is frozen | Pilot scope and KPIs |
| K02 | Existing app repo or fresh repository | Inspect first; never rebuild unseen code | Ankush + implementer | K0 | Any code |
| K03 | Stack, package manager, database, test tools | Preserve suitable existing stack; otherwise write ADR | Implementer, approved by Ankush | K0 | Scaffolding |
| K04 | Milestone 1 cut line | Mock chat → CRM → reserved order | Ankush | K0 | First task |
| K05 | Reservation creation point and TTL | Decide from proposed domain rules | Ankush + implementer | Before order schema | Reservation behavior/tests |
| K06 | Milestone 1 permissions marked Open | Least privilege | Ankush | Before affected endpoints | Authorization |
| K07 | WhatsApp direct API or BSP | Adapter boundary; no provider selected | Ankush | Before live sandbox | Channel onboarding/live messaging |
| K08 | Merchant collection funds flow | Separate from Vendora subscription billing | Ankush + qualified adviser | Before payment integration | Payments/refunds/reconciliation |
| K09 | Privacy, retention, region, and provider data flow | No real data until reviewed | Ankush + qualified adviser | Before real-data pilot | Pilot onboarding |
| K10 | Pilot success targets | Define after seller baseline interviews | Ankush | Before paid pilot | Go/no-go evaluation |

## 11. Risks and dependencies

| Risk/dependency | Current treatment | Gate |
|---|---|---|
| First milestone grows into the entire P0 list | P0a/P0b/P0c cut line and explicit non-goals | Every task review |
| Back-office workflow is built before buyer-channel value is tested | Include a mock conversation in Milestone 1; prioritize live sandbox after provider choice | Next-slice choice |
| Tenant leakage | Server authorization, tenant-safe references, endpoint negative tests | Milestone exit |
| Oversell or double release | Atomic reservations, append-only ledger, concurrency/idempotency tests | Milestone exit |
| Mock mistaken for integration | Persistent Test-channel labels and no production credentials | Milestone exit |
| Provider/pricing rules change | Adapters and versioned configuration; re-verify official terms and invoice evidence | Integration/public pricing |
| PII/audio crosses provider boundaries without review | Data-flow inventory, minimal retention, legal/privacy gate | Real-data pilot |
| Documentation drifts | One owner per fact and handoff updates tied to completion | Every milestone |

## 12. Pilot-readiness gates (not Milestone 1 work)

Before any real merchant or customer data is used:

- Confirm target seller segment with interviews and anonymized workflow evidence.
- Complete a data-flow and retention inventory for messages, identities, media, voice, AI prompts, payments, and logs.
- Obtain qualified review of applicable privacy, consent, messaging, payments, tax, and contractual obligations.
- Select and sandbox-test official WhatsApp access; verify current policy, templates, opt-in, handover, rates, and invoice behavior.
- Separate Vendora subscription billing from buyer-to-merchant collection accounts and responsibilities.
- Define backup/restore, RPO/RTO targets, monitoring, incident ownership, support escalation, and manual reconciliation.
- Verify domain/trademark before public branding spend or migration.
- Approve pilot pricing only after measured provider cost and willingness-to-pay evidence.

## 13. Metrics to define before pilot

Targets remain Open until baseline seller evidence exists. Instrumentation should support:

- **Conversation-to-order completion:** conversations resulting in a confirmed order ÷ eligible sales conversations.
- **Order correction rate:** confirmed orders needing SKU/variant/quantity/address correction ÷ confirmed orders.
- **Stock integrity incident rate:** orders that cannot be fulfilled due to recorded-stock mismatch ÷ confirmed orders.
- **Median admin time per order:** merchant active time from first handling to confirmed order, measured consistently.
- **Weekly operations use:** pilot merchants completing a defined CRM/order/stock action in a week ÷ active pilot merchants.
- **AI correction/unsafe-action rate:** applicable only after labelled evaluation sets and AI features exist.

Metric events, consent, retention, and dashboards belong to their implementation milestone. Do not collect behavioral data merely because a metric is listed here.

## 14. Review record

Codex inspected the current documentation pack and consulted Claude through the local Claude bridge on 11 November 2026. Both reviews found the principal missing artifact to be a bounded first-milestone contract. Claude recommended the mock chat-to-reserved-order walking skeleton used here.

Codex independently rejected two parts of Claude's response:

- Stage 0 is not inherently contradictory: it correctly becomes executable once the real source repository is identified. The kickoff gate now makes that dependency explicit.
- The research report was created on the current date, so it is not stale merely by age. Its provider policies, rates, and other changeable claims still require current official verification before use.

No code, deployment, provider account, live data, external message, or purchase was changed during this review.
