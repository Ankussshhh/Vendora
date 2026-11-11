# Public pre-login experience wireframe

Status: **Proposed wireframe — approved flow, unapproved visual design and marketing copy**

Prepared: 11 November 2026

Visual companion: `wireframes/vendora-public-wireframes.html`

## 1. Confirmed flow

Ankush confirmed that the marketing site exists before authentication and that successful sign-up or login redirects the merchant to `/dashboard`. This document covers only the public and authentication screens; it does not design the dashboard.

```text
Landing page (/) ─┬─ Create account (/signup) ── success ──> Dashboard (/dashboard)
                  ├─ Log in (/login) ─────────── success ──> Dashboard (/dashboard)
                  └─ See how it works (#workflow)

Log in (/login) ── Forgot password (/forgot-password) ──> Return to log in
```

## 2. First wireframe routes

| Route | Purpose | Primary action | Status |
|---|---|---|---|
| `/` | Explain the conversation-to-order value and audience | Create account | Wireframed |
| `/signup` | Create a merchant owner account | Create account → `/dashboard` | Wireframed |
| `/login` | Authenticate an existing member | Log in → `/dashboard` | Wireframed |
| `/forgot-password` | Request a reset path without revealing account existence | Send reset instructions | Wireframed |
| `/dashboard` | Post-authentication destination | Outside this task | Endpoint only |

Deferred from the first wireframe: separate `/product` and `/pricing` pages. The landing page can validate the story first, and no numeric pricing is approved. Privacy and terms links remain non-live placeholders until qualified review and real content exist.

## 3. Landing-page direction

### Positioning choice

Use an **operations-first story with conversation as the entry point**. The page should not look like another generic unified inbox. It shows how a buyer message becomes a customer record, a stock-aware order, and a fulfilment handoff.

Proposed hero copy:

- Eyebrow: `For social sellers and small teams`
- Headline: `Turn every customer conversation into a trackable order.`
- Supporting copy: `Keep customer context, product variants, stock and order progress together—from the first message to fulfilment.`
- Primary CTA: `Create account`
- Secondary CTA: `See how it works`
- Preview label: `Illustrative product concept · Sample data`

`Create account` is used because the intended product flow now explicitly includes self-serve sign-up. If the launch model changes to a gated pilot, replace it consistently with `Request pilot access` and change `/signup` to an application form.

### Section order

1. **Header** — wordmark, one `How it works` anchor, `Log in`, and `Create account`.
2. **Hero** — outcome, audience, two actions, and one coherent workflow preview.
3. **Conversation-to-order workflow** — message → stock check → tracked order → fulfilment handoff.
4. **Shared operating context** — explain customer history, catalog/variants, stock, and orders without duplicating the workflow.
5. **AI and voice assistance** — presented as planned assistance with the rule `Vendora suggests; the merchant confirms`.
6. **Product principles** — human handover, merchant-confirmed changes, separate business workspaces and staff roles. These are design principles, not current security/compliance claims.
7. **Audience statement** — social sellers and small teams; no unsupported logos or testimonials.
8. **Final CTA** — create account or log in, with the post-auth destination stated plainly.
9. **Footer** — minimal navigation; legal content marked pending until reviewed.

## 4. Hero product preview

The preview is a single illustrative merchant workspace rather than a collage of disconnected feature cards:

- left: an incoming buyer conversation;
- center: matched customer and selected product variant;
- right: order draft with stock check and next action;
- visible label that the data and interface are illustrative;
- no revenue charts, fake activity counts, customer logos, payment success, or live-integration badge.

The preview may use a generic `Conversation` channel label. WhatsApp and Instagram names/logos should appear only after the corresponding integration and brand-use requirements are verified.

## 5. Authentication wireframes

### Sign up

Fields: full name, work email, password, business name, country, currency, timezone, and acceptance of reviewed terms when they exist. Country/currency/timezone may be collected in a short onboarding step instead of the first form after usability testing.

States: default, inline validation, email already in use without leaking unnecessary details, submitting, creation failure, and success redirect to `/dashboard`.

### Log in

Fields: email and password. Actions: `Log in`, `Forgot password?`, and `Create account`.

States: default, invalid credentials using a non-enumerating message, submitting, temporary failure, and success redirect to `/dashboard`. Preserve only a validated safe internal return path; never accept an arbitrary external redirect URL.

### Forgot password

Field: email. The response is the same whether or not the account exists. Provide a return-to-login action, request throttling, expiring single-use reset links, and an audited password-change completion path when implemented.

## 6. Responsive and accessibility behavior

- Mobile-first layout down to 320 px; hero copy and primary CTA appear before the illustrative preview.
- Header collapses to a labelled menu; `Log in` and `Create account` remain reachable without hover.
- One H1, logical heading order, visible keyboard focus, labelled inputs, inline error text, and status announcements for asynchronous authentication.
- Touch targets are approximately 44 px; forms do not rely on color alone; copy remains readable at browser zoom.
- Reduce preview density on mobile rather than shrinking desktop UI into unreadable text.

## 7. Claims and content guardrails

Do not publish these until supported and approved:

- `free`, trial duration, plan names, numeric prices, discounts, or launch dates;
- testimonials, logos, merchant counts, order counts, or quantified savings;
- `secure`, `compliant`, `verified payments`, or similar unqualified guarantees;
- live WhatsApp/Instagram, AI, voice, payment, or shipping claims;
- domain/trademark symbols or language implying final brand clearance.

Label planned AI/voice capabilities and illustrative product UI clearly. The wireframe is allowed to show the intended future workflow; production marketing must describe only implemented and verified behavior.

## 8. Open design decisions

- Final visual identity, typography, color, imagery, and logo.
- Self-serve launch versus gated pilot; the current wireframe follows Ankush's self-serve sign-up flow.
- Exact signup fields and whether business configuration is collected before or after account creation.
- Whether authentication supports password only, magic link, social identity, or a combination.
- Final legal links and consent wording after qualified review.
- Dashboard information architecture, which is the next separate wireframe task.

## 9. Claude consultation and Codex review

Claude independently recommended the operations-first direction because the stated problem is fragmented chat, customer, stock, and order context—not merely inbox consolidation. Codex accepted that recommendation and Claude's advice to merge overlapping workflow/capability sections, remove unapproved pricing/social proof, label the preview as illustrative, and defer standalone product/pricing pages.

Codex did not adopt Claude's proposed `Request pilot access` CTA because Ankush explicitly specified a sign-up flow that redirects to the dashboard. The wireframe therefore uses `Create account`, while documenting the pilot-gated alternative if the launch model changes.
