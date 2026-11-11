# User flows

## Merchant onboarding

Create merchant → choose country/currency/timezone → import or add catalog → verify sample SKUs → connect approved WhatsApp number → test message → configure handover/policies → see estimated charges → activate pilot. A number cannot become active merely because the UI says connected; verify provider configuration and receipt of a test event.

## Buyer to paid order

1. Receive a WhatsApp message; deduplicate and attach to the correct merchant/customer.
2. Check handover status and AI balance; honor human takeover.
3. Retrieve relevant active catalog items and current stock; ask for missing variant/quantity.
4. Show price and checkout summary with delivery terms; obtain buyer confirmation.
5. Atomically create order/reservation with expiry and idempotency key.
6. Create merchant-linked payment request. Browser redirects are informational only.
7. Verified gateway event updates payment, triggers a guarded order transition and dispatch task.
8. Send eligible order update; record category/rate/status separately from AI usage.

If payment succeeds after reservation expiry, reconcile available stock; route exceptions to owner review and avoid silently confirming unavailable goods. Partial payments, disputes and refunds have explicit states. COD orders may be confirmed while payment remains pending.

## CRM workflow

Open customer → see contact identity, source, timeline, orders, opt-in and assigned staff → add note/tag/follow-up → mark follow-up completed → optionally hand off conversation. Avoid merging customers based only on a shared display name. Proposed cross-channel merges require an owner-reviewed link or verified identity evidence.

## Owner voice-to-stock

Tap microphone in dashboard → show recording status → transcribe → parse into a draft → match existing variants → show Add versus Set, quantity, price/currency and any ambiguity → owner corrects/confirms → transaction writes ledger and audit → show result/undo path.

Existing SKU plus conflicting name/variant prompts clarification. “Add 10” is an increment; “set stock to 10” is an absolute adjustment with a reason. New products remain drafts until required fields are completed. Voice does not bypass role permissions. Undo produces a compensating inventory entry, not deletion of history.

## Credit exhaustion

Warn at 70/90/100% → existing jobs settle against reserved credits → prevent new unreserved AI work → keep manual inbox/CRM/order operations available → offer a priced top-up with spending controls. WhatsApp delivery depends independently on provider billing balance and eligibility.

## Returns and cancellations

Owner initiates eligible cancellation/return → record reason and state → refund through verified provider workflow if authorized → restock only after the configured receipt/inspection event. Never restock automatically just because an AI message promises a return.
