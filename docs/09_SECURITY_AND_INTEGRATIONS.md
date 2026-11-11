# Security, privacy and integrations

## Tenant and role security

Proposed roles: owner, admin, sales, fulfilment and viewer. Implement a permission matrix rather than relying only on labels. Owner controls billing/credentials; sales handles chats/CRM; fulfilment sees necessary packing details; viewer is read-only. Define admin financial permissions explicitly. AI tools inherit the caller's permissions. Test cross-tenant read/write/export access.

Encrypt credentials at rest, keep them server-side, restrict access and rotate/revoke connections. Validate uploads by MIME/content/size; use private media and signed URLs. Validate remote media fetches against SSRF; no arbitrary internal-network fetches. Escape output and defend exports against spreadsheet formula injection.

Keep access/audit records and sanitize logs. Avoid logging entire chats/audio by default. Define transcript/audio/media retention, deletion, consent and data-processing terms before pilot onboarding. The current plan is not a jurisdiction-specific legal assessment.

## WhatsApp

Use official platform/BSP APIs. Confirm required business/number setup, permissions, coexistence support, templates, opt-in and handover against current official documentation. The dated research reports pricing inconsistencies; reconcile applicable contract/rate card and test invoice before public fixed rates. Destination and category affect cost. Do not automate customer campaigns without explicit merchant authorization.

## Instagram

Confirm professional-account eligibility, authorization, app review, webhook support, permissible message windows and available historical data. No scraping or promises of unlimited DM access. Until integrated, clearly label manual Instagram source tracking.

## Payments

Decide separate providers/accounts for Vendora SaaS billing and each merchant's customer collections. Verify signed raw webhook bodies and reject mismatches/replays as appropriate. Gateway callbacks, not screenshots or browser success pages, authorize payment changes. Refunds need explicit permissions and confirmation appropriate to the merchant workflow. Reconcile asynchronous refunds and disputes.

## Shipping

Pilot supports manual tracking. Shiprocket/other adapters follow a later scoped task with current API contracts. Quotes, labels, COD fees, returns and RTO are merchant costs. Record uncertain label purchases instead of retrying blindly.

## AI providers

Select model/transcription/image providers after quality/cost tests. Confirm data handling, regional availability and production rates. Adapters expose configured budgets and limits. External text never changes system/tool authorization. Production credentials and live sends must remain disabled in local mock mode.
