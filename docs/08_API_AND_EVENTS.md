# API and event contracts

Illustrative resource contracts, not implemented endpoints or a mandated URL style. Authenticate every merchant-facing request and derive tenancy from validated membership. Never trust a merchant_id supplied by the browser alone.

| Operation | Example route | Key behavior |
|---|---|---|
| Customer list/timeline | GET /api/customers; GET /api/customers/:id/timeline | Tenant scope, pagination, role filtering |
| CRM notes/tasks | POST /api/customers/:id/notes; POST /api/follow-ups | Actor attribution and idempotent creates |
| Catalog | GET/POST /api/products; PATCH /api/variants/:id | Validated attributes and tenant SKU uniqueness |
| Manual stock adjustment | POST /api/inventory/adjustments | Reason and idempotency key; audit |
| Voice draft | POST /api/ai/inventory-drafts | Upload reference, duration limit, quoted AI work |
| Draft confirmation | POST /api/inventory-drafts/:id/confirm | Role check, draft revision, transaction, single commit |
| Orders | POST /api/orders; POST /api/orders/:id/transitions | Server totals, stock reservation and guarded states |
| Payment link | POST /api/orders/:id/payment-requests | Merchant provider account, amount/currency, idempotency |
| AI quote/execute | POST /api/ai/quotes; POST /api/ai/executions | Quote version/expiry, reserve credits, async execution |
| Usage | GET /api/billing/usage; GET /api/billing/credits | Separate AI and delivery costs; estimated vs settled |
| Provider callbacks | POST /webhooks/:provider | Signature/raw-body validation and event deduplication |

## Event envelope

Fields: event_id, event_type, merchant_id, occurred_at UTC, schema_version, correlation_id, idempotency_key and payload. Publish minimum necessary personal data. Examples: message.received, ai.execution.completed, inventory.adjusted, order.confirmed, payment.verified, shipment.updated, credit.settled.

## Contract details

Use explicit currency and integer minor amounts. Support pagination and deterministic ordering. Distinguish validation, unauthorized, forbidden, conflict, insufficient credit, quota and provider-unavailable errors with structured codes and actionable user messages. Do not leak resource existence across merchants.

Write APIs accept stable idempotency keys where retries can duplicate effects. Same key plus different request payload returns a conflict. Webhook provider IDs are verified/scoped before deriving tenant ownership. Redact secrets in errors. Async job status endpoints/notifications distinguish queued/running/succeeded/failed/reconciliation_needed and never imply success merely from HTTP acceptance.
