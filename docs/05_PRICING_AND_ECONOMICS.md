# Proposed pricing and economics

These prices are recommendations from the research, not user-approved launch terms. India-first pilot prices exclude applicable tax and WhatsApp fees. International price books remain open.

| Plan | Monthly INR | Shared AI credits | Users | WhatsApp numbers | Active variants | Orders/month |
|---|---:|---:|---:|---:|---:|---:|
| Starter | 1,499 | 1,000 | 1 | 1 | 250 | 300 |
| Growth | 3,499 | 4,000 | 3 | 1 | 2,000 | 1,500 |
| Scale | 7,999 | 12,000 | 8 | 2 | 10,000 | 5,000 |

Top-ups proposed: ₹499/500 credits; ₹1,499/2,000; ₹3,499/5,000. Trial proposed: 14 days, 10 products, 100 credits and demo or tightly capped delivery. Assisted setup proposed: ₹1,999–₹4,999 based on actual work. Dedicated managers and custom integrations are scoped separately.

Shared credits mean 4,000 Growth credits cover at most 2,000 standard text replies if no credits are spent on anything else. Do not label them “2,000 conversations.” A conversation can contain many replies.

| Monthly unit budget | Starter | Growth | Scale |
|---|---:|---:|---:|
| AI at full allowance | 100 | 400 | 1,200 |
| Variable infra | 100 | 200 | 400 |
| Support | 200 | 350 | 700 |
| Incident/refund reserve | 75 | 175 | 400 |
| Collection allowance | 30 | 70 | 160 |
| Total variable cost | 505 | 1,195 | 2,860 |
| Contribution | 994 | 2,304 | 5,139 |
| Margin before fixed costs/CAC | 66.3% | 65.8% | 64.2% |

These budgets are assumptions. At 40/45/15% plan mix: ARPU ₹3,374 and contribution ₹2,205.25. Covering ₹1.5L fixed monthly cost needs about 69 merchants before acquisition. At 100 merchants, estimated contribution ₹2,20,525 less ₹1.5L fixed cost leaves ₹70,525 before acquisition and taxes. Ten new customers at ₹5,000 CAC leave ₹20,525. Do not describe contribution as net profit.

A strict 65% margin floor suggests about ₹8,215 for Scale under the baseline formula; ₹8,499 is a possible alternative. Keep the published price undecided until real costs and willingness to pay are measured.

## Billing requirements

Use explicit plan versions and effective dates. Entitlements use server-side subscription state, not client flags. Keep legacy plan grandfathering explicit. Reject new excess seat/variant creation while allowing existing data access. Enforce order caps without losing inbound customer messages: route over-limit inquiries to manual handling and preserve webhook intake. Read-only access and suspension policies must be documented before billing launch.

Subscription payments and merchant merchandise payments are different financial flows. Merchant gateway, shipping, advertising and COD/RTO costs are not absorbed by the SaaS price. Do not silently mark up WhatsApp rates; disclose any service fee.

## Unverified rate warning

The dated research found inconsistent Meta public/provider descriptions of service-message charging. Never embed October 2026 service exemptions as immutable product behavior. Store rates/exemptions per applicable provider contract, market and effective period; verify with a real invoice before advertising a fixed message price. The copied report preserves its dated source limitations.
