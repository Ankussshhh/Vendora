# Proposed architecture

No stack is selected. Inspect the existing Zappcarts repository before choosing implementation details. Preserve a suitable working stack. If starting fresh, a TypeScript web app/API with PostgreSQL and a background job queue is a reasonable proposal; this is not an instruction to migrate.

## Logical components

- Merchant web UI: responsive CRM, inbox, orders, catalog, voice draft editor, usage and settings.
- Auth/tenancy service: memberships, roles and session validation.
- Commerce service: catalog, pricing, inventory reservations, orders and returns.
- Integration ingress: signature verification, raw webhook deduplication and fast acknowledgement.
- Worker: normalized events, AI jobs, notification outbox and reconciliation.
- AI gateway: provider adapters, prompt/tool versions, quotes, credit reservations, bounded execution and cost logging.
- Billing service: plan entitlements, credit ledger and separate messaging charge reconciliation.
- Persistent database: transactional commerce/credit records; tenant-scoped indexes.
- Object storage: private catalog/media uploads, signed short-lived reads and retention policy.

Begin as a modular monolith rather than separately deployed microservices unless actual constraints justify otherwise. AI work and webhook processing still run asynchronously.

## Reliability patterns

Write order changes and outgoing intent into the same database transaction using an outbox. Worker sends once as far as provider idempotency supports; reconcile ambiguous send outcomes. Do not promise exactly-once delivery across external networks. Deduplicate inbound events with provider/event identifiers scoped to the appropriate account.

Use transactions/row locks or equivalent atomic operations for stock and credit reservations. Database constraints backstop application checks. Store a compensating history for inventory and money rather than editing ledger history.

Use bounded retries with backoff, dead-letter visibility and reconciliation jobs for pending payments, expired reservations, uncertain AI results and message delivery. Manual repair actions are authorized and audited.

## Configuration

Keep secrets in environment/secret storage. Keep public tenant settings separate from secrets. Store versioned provider rate schedules and feature flags server-side. Dev/test adapters must be explicit and cannot call live services by default.

## Release approach

Local mocks → provider sandbox/test account → tightly scoped pilot → production cohorts. Database migrations need a rollout/rollback plan and backup verification. Log correlation IDs without unnecessary personal content. Agree retention, load and recovery targets before claiming availability guarantees.
