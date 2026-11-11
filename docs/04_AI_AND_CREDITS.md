# AI usage, credits and execution contracts

Status: proposed commercial/engineering design. Amounts require cost measurements before public launch.

## Separate three bills

1. Platform subscription buys features and limits.
2. AI credits buy bounded AI work across customer replies and owner tools.
3. WhatsApp delivery charges follow the merchant/provider's applicable rate card.

An AI reply may cost credits and a WhatsApp delivery fee. A dashboard voice command costs AI credits without a WhatsApp fee. A fixed outbound template uses no AI credits but can incur delivery charges.

| Action key | Proposed credits | Boundaries |
|---|---:|---|
| text.standard | 2 | Bounded prompt/output and routine tools |
| text.complex | 6 | Small capped multi-step workflow |
| audio.transcribe | 20/minute | Proportional seconds; extraction separately quoted |
| inventory.extract | 2 for a short request | Larger batches quoted before execution |
| image.recognize | 5 | One bounded image at a configured resolution |
| image.generate | From 50 | Model/quality/variants determine quote |
| report.summarize | From 10 | Bounded data slice; large reports quoted |
| manual.database_action | 0 | Ordinary CRM/stock/order actions |

Proposed internal maximum provider budget: ₹0.10/credit. This is a design target, not a vendor guarantee. Track actual cost and gross margin by action, model and tenant; automatically disable or reprice actions exceeding configured cost/step ceilings. Do not auto-reprice an already accepted quote.

## Quote and settlement

- Version each action schedule. Quote amount, assumptions, expiry and maximum charge before expensive/admin operations.
- Store credits as integer microcredits, e.g. 1 credit = 1,000 microcredits, to support audio durations without float drift.
- Reserve available credits atomically before starting work; reject insufficient balance without calling the provider.
- Settle once using a unique action execution ID and immutable ledger entry. Release unused reservations; enforce a timeout/recovery process.
- Charge for completed user-visible work under the disclosed policy. Release/refund on system failures; track unrecovered provider cost internally as incident expense. User-requested regenerations need a fresh quote.
- Internal retries use the same billable action ID and cannot double-charge. Provider-side ambiguous outcomes go to reconciliation; do not blindly repeat expensive requests.
- Debit earliest-expiring eligible balances. Refund against the original bucket with auditable adjustments; define post-expiry credits explicitly before launch.
- Monthly included credits reset at the subscription billing boundary. Proposed purchased credits expire after 12 months. Confirm subscription proration/downgrade and expiry policy before production.
- Auto-top-up defaults off. Both auto-top-up and maximum monthly spend require explicit owner settings.

## Model behavior

Use schema-constrained tool calls. Tools check tenant, role and resource ownership. LLM output is untrusted input. Catalog descriptions/customer messages cannot grant tool permissions or alter instructions. No general SQL/execution tools are exposed to the assistant.

Price, stock, order totals and payment state come from authoritative services. Retrieve relevant catalog subsets rather than full catalogs. Bound context, tool count, output and request duration. Use fixed responses or a smaller suitable model when possible, but benchmark quality and accuracy before switching.

Owner stock mutations require confirmation of a normalized draft. Reads and zero-credit manual actions should remain fast. AI writes to payment/refund state or bulk destructive operations are outside the initial tool scope.

## Evaluation and cost evidence

Create a synthetic/anonymized evaluation set: missing SKU, noisy audio, mixed-language commands, decimal price, conflicting variant, prompt injection, unavailable stock and human takeover. Track exact-match fields, unsafe-action rate, correction rate, latency and actual cost. Never claim a supported language works reliably based only on one demo.
