# Logical data model

Schema proposal; adapt to actual repository with documented rationale. Every merchant-owned record carries a merchant_id, and cross-record references must prevent tenant mismatches.

| Entity | Important fields / constraints |
|---|---|
| Merchant | id, name, country, currency, timezone, locale, status |
| User / Membership | user_id, merchant_id, role; unique membership |
| ChannelAccount | merchant_id, provider, external_account_id, encrypted credential reference, connection status |
| Customer | merchant_id, name, normalized contact fields; no global cross-merchant uniqueness |
| CustomerIdentity | customer_id, channel_account_id, external_identity; unique within channel account |
| ConsentEvent | customer_id, channel, purpose, source, time, grant/revoke evidence |
| CRMNote / FollowUp | customer_id, author/assignee, content, due_at, status |
| Product / Variant | merchant_id, product_id, SKU, attributes, active flag, price minor units, currency; unique tenant SKU |
| InventoryLocation | merchant_id, name, active flag |
| InventoryLedger | variant/location, signed quantity delta, reason, source_event, actor, created_at; append-only |
| StockReservation | order_id, variant/location, quantity, expires_at, state; one guarded release/consume |
| Order / OrderLine | merchant_id, customer_id, order state, totals/currency, source; line snapshots of SKU/price/quantity |
| Payment / Refund | merchant_id, order_id, provider reference, amount/currency, verified status, timestamps |
| Shipment / Return | order references, tracking, status; received/restock events separate |
| Conversation / Message | channel/customer, assigned user, human handover state, provider IDs, delivery state |
| InboundEvent / OutboxEvent | provider/event key, body reference/hash, processing status; scoped uniqueness |
| AIExecution | merchant/action ID, schedule/model/prompt version, status, quote, token/audio counts, actual provider cost |
| CreditBucket | merchant_id, source, issued amount, expiry, billing period |
| CreditReservation / CreditLedger | execution ID, bucket, integer microcredits, reason, reserve/settle/refund references; idempotent |
| MessagingCharge | provider message ID, destination/category, rate version, currency, actual/estimated cost, adjustment status |
| PlanVersion / Subscription | price/currency, entitlements, included credits, billing period, provider reference and status |
| AuditEvent | merchant, actor, action, resource, redacted before/after, time, correlation ID |

## State separation

Order: draft → confirmed → packing → shipped → delivered; cancellation guarded by fulfilment state. Payment: unpaid/pending/partially_paid/paid/failed/partially_refunded/refunded/disputed. Shipment and return have independent states. Do not collapse these into a single order status.

## Invariants

- Ledger and reservation updates cannot create negative available stock under the configured no-backorder policy.
- Paid amount and currency must reconcile with the expected payment; mismatches require review.
- Credit availability excludes active reservations and expired buckets; no negative spend under concurrent requests.
- Historical order price/currency snapshots remain stable after catalog edits.
- Inventory quantity is integer units for pilot; fractional-weight goods require a separate precision policy.
- UTC storage plus merchant timezone display. Money uses currency-aware minor units; FX conversion is never implicit.
- Deletion/anonymization policy must preserve necessary financial references without keeping unnecessary personal data indefinitely.
