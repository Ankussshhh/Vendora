# Current handoff — ChatGPT/Codex to Claude

Date: 11 November 2026.

## Goal

Keep the Vendora concept, requirements, implementation evidence and review synchronized through shared files while Claude handles implementation after Ankush's next instruction.

## Current state

The public Next.js web app is scaffolded and its pre-login landing page is implemented. The Golden Collaboration Rule is canonical in `shared/WORKLOG.md`. After P-009, the page keeps the warm editorial paper/ink/vermilion identity but is motion-first: an order sheet expands into a complete workspace, a code-native textile visual zooms into view, and a four-stage order story runs as one continuous native-scroll sequence. Landing code is organized under `apps/web/app/components/landing/` and uses Tailwind v4 utilities. Authentication, dashboard, providers, production configuration, and database work have not started.

## Read next

README → shared/WORKLOG.md → KICKOFF.md → CLAUDE.md → docs/00_PROJECT_STATE.md → docs/02_PRODUCT_REQUIREMENTS.md → docs/04_AI_AND_CREDITS.md → docs/12_OPEN_DECISIONS.md. Consult the dated research for assumptions and sources.

## Next authorized action

Hand-scroll and keyboard-test the public landing page when Computer Use is available, especially the 240svh workspace transformation, 220svh workflow sequence, frame rate, and focus order. After Ankush approves the new visual direction, move to login/signup; do not start authentication or dashboard work without his prompt.

## Review priorities for ChatGPT/Codex

Tenant isolation; stock/payment correctness; idempotency; credit reservations/settlements; bounded AI; voice confirmation; honest integration states; all-in merchant cost.

## Outstanding blockers

Browser-driven QA is currently unavailable because the Computer Use browser host returns unavailable, although the local server responds and production build passes. Auth provider, hosting, region, reservation timing/TTL, prices and production providers remain open.
