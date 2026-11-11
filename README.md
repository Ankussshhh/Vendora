# Vendora — shared product and engineering workspace

Prepared for Ankush Patil on 11 November 2026.

**Current state: planning handoff only. No product code has been created or audited. Wait for Ankush's next instruction before implementing.**

Vendora is the selected working brand for the idea previously called Zappcarts. Domain and trademark availability are unverified. The existing public website is https://zappcarts.com/; do not rename production assets or migrate customers without a separate instruction.

## Responsibilities

- Ankush: product owner, priorities, budget, final business decisions.
- ChatGPT/Codex: research, product reasoning, requirements, architecture review and implementation review.
- Claude: coding, migrations, tests and implementation handoffs when instructed by Ankush.

There is no automatic connection between model chats. Share this folder with both tools; each must read current files before working. Keep secrets outside shared Markdown.

The Golden Collaboration Rule is recorded in `shared/WORKLOG.md`: every prompt gets one entry in that same file, Claude records implementation, Codex reviews the actual diff and record, and both correct unsupported or contradicted claims.

## Read first

1. `shared/WORKLOG.md` — mandatory Golden Collaboration Rule and prompt-level record.
2. `KICKOFF.md` — proposed first milestone, gates, non-goals and completion contract.
3. `CLAUDE.md` — coding handoff and boundaries.
4. `docs/00_PROJECT_STATE.md` — actual progress and next step.
5. `docs/01_IDEA_AND_POSITIONING.md` — idea and confirmed intent.
6. `docs/02_PRODUCT_REQUIREMENTS.md` — capabilities and acceptance conditions.
7. `docs/03_USER_FLOWS.md` — seller and customer journeys.
8. `docs/04_AI_AND_CREDITS.md` — AI actions, budgets and billing semantics.
9. `docs/05_PRICING_AND_ECONOMICS.md` — proposed commercial model.
10. `docs/06_ARCHITECTURE.md`, `07_DATA_MODEL.md`, `08_API_AND_EVENTS.md` — proposed implementation contracts.
11. `docs/09_SECURITY_AND_INTEGRATIONS.md`, `10_ACCEPTANCE_AND_TESTING.md` — release requirements.
12. `docs/11_ROADMAP.md`, `12_OPEN_DECISIONS.md` — scope and unknowns.
13. `research/2026-11-11_Zappcarts_Market_Research.md` — dated background, sources and limitations.

## Shared working files

- `shared/DECISIONS.md`: durable decisions, including their status and rationale.
- `shared/WORKLOG.md`: single append-only record required after every prompt, including implementation and review evidence.
- `shared/IDEA_INBOX.md`: new ideas without silently expanding the active scope.
- `shared/TASKS.md`: task ownership and completion evidence.
- `shared/HANDOFF.md`: current transfer between reasoning and coding.
- `shared/CHANGELOG.md`: concise history of material changes.
- `templates/IMPLEMENTATION_HANDOFF.md`: reusable Claude completion format.

All pricing, credit amounts, proposed stack choices and milestones are recommendations unless explicitly marked accepted. The user selected the working name and collaboration split; they have not approved every recommendation in this pack. Relative links and folder layout remain usable when moved to Desktop or a repository.
