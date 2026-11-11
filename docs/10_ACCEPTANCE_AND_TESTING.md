# Acceptance and testing

Prioritize meaningful tests of business invariants and failure paths. This pack has no application code or runnable product tests.

| Scenario | Required result |
|---|---|
| Two checkouts request last unit | At most one reserves the unit; the other receives a conflict/alternative |
| Duplicate order request | Same idempotency key produces one order, not two |
| Duplicate/reordered payment events | Amount/state remains correct; no duplicate fulfilment |
| Payment amount/currency mismatch | Review state; not marked safely paid |
| Payment arrives after stock expiry | Reconciled exception path; no unfulfillable automatic promise |
| Concurrent AI calls exhaust credits | No negative available balance or unreserved spend |
| Worker retries after crash | One billed action and one committed business effect |
| AI provider fails after reservation | Recoverable state; release/refund per policy; actual provider loss logged |
| Credit month boundary/expiry | Correct bucket use and reservation reconciliation |
| Voice 'add 10' versus 'set 10' | Correct draft intent; owner must confirm |
| Voice SKU/variant ambiguous | Clarification, no silent stock write |
| Voice confirm retried/stale draft | No duplicate adjustment; conflict on changed draft |
| Customer prompt asks for another tenant's data | Tool denies access and reveals no data |
| Human takeover active | AI does not send competing replies |
| Low AI or messaging balance | Independent warnings; manual CRM remains usable |
| Refund/return initiated | Restock occurs only at configured verified receipt step |
| Mock integration enabled | UI/logs clearly identify test state; no live provider call |
| Multi-currency amounts | Correct minor-unit precision and no implicit conversion |

## Verification levels

Unit tests for pricing/rounding/permissions/state rules. Integration tests against a real test database for constraints and concurrency. Contract tests for provider signature parsing and adapters. End-to-end tests for catalog → buyer inquiry → draft → payment → dispatch and owner voice → confirmed adjustment. Provider sandbox smoke tests before pilot activation.

Perform mobile and keyboard checks on inbox/order queue/draft confirmation. Record latency/cost on representative catalog sizes and agreed concurrent load. Document actual test commands and outcomes in the handoff. Do not manufacture test evidence or require a broad test suite for a small documentation-only edit.

## Release evidence

Working flows; migrations reviewed; rollback/recovery procedure; verified webhooks; no exposed secrets; tenant-boundary tests passed; provider rate configuration verified; help/handover and usage exhaustion paths working; data export/retention behavior documented. Publish only supported functionality.
