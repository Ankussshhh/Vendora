# Changelog

## 2026-11-11 — Planning pack

- Recorded Vendora as selected working name and the Claude/ChatGPT responsibility split.
- Added idea, requirements, user journeys, AI usage design, pricing and logical architecture/contracts.
- Added acceptance criteria, phased roadmap, open decisions and shared handoff templates.
- Included the original dated Zappcarts research unchanged as background.
- No application implementation or production action performed.

## 2026-11-11 — Pre-kickoff review

- Audited the documentation pack and obtained an independent Claude gap review.
- Added `KICKOFF.md` with a proposed mock chat-to-reserved-order first milestone, kickoff gates, scope cut line, domain rules, demo script, verification contract, decisions and pilot-readiness gates.
- Updated the read order, project state, task board and handoff; no implementation or production action performed.

## 2026-11-11 — Golden Collaboration Rule

- Added `shared/WORKLOG.md` as the single per-prompt audit shared by Codex and Claude (`P-001`).
- Required Claude to record implementation and checks in that file and Codex to review both the actual diff and log claims.
- Added mutual evidence-based correction and protocol-repair duties; linked the rule from `AGENTS.md`, `CLAUDE.md`, README and handoff files.
- No application implementation or production action performed.

## 2026-11-11 — Public landing and authentication wireframe

- Added the proposed pre-login landing page and authentication flow wireframe (`P-002`).
- Recorded the accepted redirect from successful sign-up/login to `/dashboard`.
- Kept pricing, social proof, provider integrations, legal claims and dashboard design outside the approved wireframe scope.
- No production website, authentication system or dashboard was implemented.

## 2026-11-11 — Greenfield stack recommendation

- Added the proposed TypeScript modular-monolith stack and decision gates (`P-003`).
- Recommended Next.js, PostgreSQL/Drizzle and a separate Graphile Worker process; deferred Redis, a separate API service and microservices until measured triggers exist.
- Kept auth vendor, hosting, region, RLS/pooler behavior and stock-locking design as explicit pre-scaffold gates.
- No application was scaffolded and no provider or hosting account was changed.

## 2026-11-11 — Animated public landing page

- Scaffolded the Next.js public web app and replaced the basic landing draft with a responsive, dark premium SaaS presentation (`P-004`, finalized in `P-007`).
- Added scroll-linked Motion effects, a sticky four-stage workflow, floating sample product surfaces, reduced-motion handling, and generated hero artwork.
- Kept authentication and the dashboard outside scope; login and create-account links point to an honest early-access status section.
- TypeScript and the optimized production build pass. Browser-driven visual QA remains unavailable because the local browser-control host is unavailable.

## 2026-11-11 — Editorial homepage polish

- Installed Taste, Emil Kowalski's `improve-animations`, and Impeccable into the project-local Claude skill set (`P-008`).
- Rebuilt the landing page away from neon, glass, floating chips, orbit artwork, and generic dashboard-card patterns toward a warm paper-and-ink editorial commerce identity.
- Reduced motion to one purposeful workflow sequence plus finite entrance and interaction feedback; preserved reduced-motion and static fallbacks.
- Added a concrete, visibly illustrative order record and simplified the narrative to message → variant/stock → human-reviewed draft → fulfilment.
- Typecheck, production build, diff checks, and desktop/mobile headless-Chrome captures pass review. Direct interactive Computer Use QA remains unavailable.

## 2026-11-11 — Motion-first Tailwind landing architecture

- Kept the appropriate pnpm monorepo and reorganized the landing feature into `apps/web/app/components/landing/`, with copy/sample data separated from presentation and motion.
- Converted layout, responsive states, typography, colour, borders, and interactions to Tailwind v4 utilities; reduced global CSS to theme/base tokens, entrance keyframes, and the custom textile visual.
- Added a 240svh message-to-workspace transformation scene, a zooming textile/variant scene, and a 220svh continuous four-stage workflow sequence using native scroll and Motion transforms.
- Preserved static, mobile, no-JS, and reduced-motion presentations; kept the warm paper/ink/vermilion Vendora identity without neon, glass, fake metrics, or generated orbit art.
- Ignored project-local Claude skills, skill lock state, Taste diagnostics, temporary Claude packets, and the unused generated hero PNG so they do not enter product commits.
