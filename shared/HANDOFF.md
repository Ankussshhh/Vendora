# Current handoff — ChatGPT/Codex to Claude

Date: 11 November 2026.

## Goal

Keep the Vendora concept, requirements, implementation evidence and review synchronized through shared files while Claude handles implementation after Ankush's next instruction.

## Current state

Documentation and wireframes prepared only. The Golden Collaboration Rule is canonical in `shared/WORKLOG.md`. `docs/13_PUBLIC_SITE_WIREFRAME.md` proposes the pre-login experience. `docs/14_TECH_STACK_PROPOSAL.md` recommends a greenfield TypeScript modular monolith with Next.js, PostgreSQL/Drizzle and Graphile Worker, while auth/hosting/region remain gates. `KICKOFF.md` proposes a bounded mock chat-to-reserved-order Milestone 1. No application was scaffolded and no provider, production configuration or database was changed.

## Read next

README → shared/WORKLOG.md → KICKOFF.md → CLAUDE.md → docs/00_PROJECT_STATE.md → docs/02_PRODUCT_REQUIREMENTS.md → docs/04_AI_AND_CREDITS.md → docs/12_OPEN_DECISIONS.md. Consult the dated research for assumptions and sources.

## Next authorized action

Wait for Ankush to approve/correct the kickoff contract, identify the source repository and explicitly authorize implementation. When asked to code, inspect the real repository and report the relevant baseline before changing architecture. Do not build the entire roadmap automatically.

## Review priorities for ChatGPT/Codex

Tenant isolation; stock/payment correctness; idempotency; credit reservations/settlements; bounded AI; voice confirmation; honest integration states; all-in merchant cost.

## Outstanding blockers

No application repository or provider configuration supplied. Stack, reservation timing/TTL, Milestone 1 permissions, prices and providers remain open. The current workspace is `/Users/ankush/Desktop/Vendora`; the previous Desktop-write warning is historical and no longer applies to this copy.
