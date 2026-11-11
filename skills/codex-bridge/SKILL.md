---
name: codex-bridge
description: Consult local Codex (ChatGPT) CLI for an independent reasoning review, architecture critique, plan challenge, or code/diff review when the user asks to involve Codex. Independently evaluate its findings before acting.
---

# Codex bridge

Use `scripts/bridge.py` (relative to this skill) to consult Codex through its CLI. Each call is a fresh, ephemeral, read-only session; it does not sync with any existing Codex conversation. Calls use the user's Codex login and consume its allowance.

## Workflow

1. Read `CLAUDE.md`, `docs/00_PROJECT_STATE.md` and `shared/HANDOFF.md`. Define the actual question and constraints. The consultation never widens the authorized scope.
2. Write a focused UTF-8 packet to a unique temp file (use the session scratchpad): task, constraints, relevant excerpts with paths/line numbers (or the diff), and the requested output. For reasoning ask for assumptions, alternatives, failure cases and concise reasons. For review ask for concrete bugs with severity, location, triggering scenario and fix, plus missing evidence. Review priorities for Vendora: tenant isolation, stock/payment correctness, idempotency, credit reservations/settlements, bounded AI, voice confirmation, honest integration states. Do not include your preferred conclusion when you want an independent opinion.
3. Inspect and redact the packet: no secrets, `.env`, tokens or customer data. Send selected evidence, not the whole repo. Max 200,000 bytes.
4. Run:

   ```sh
   python3 <skill-dir>/scripts/bridge.py --packet <scratch>/codex-packet.txt --output <scratch>/codex-review.json
   ```

   `--doctor` checks the install and login without calling a model. `--model` is optional (omit to keep the configured default). `--timeout` defaults to 300s. Outputs are never overwritten, so use a new filename each call.
5. Read `result` from the JSON. Verify material claims against the source and tests yourself, then tell the user which findings you accept, reject or cannot verify, and why. Codex advice is input, not authority; the latest instruction from Ankush wins.

## Safety and failures

- Codex runs with `--sandbox read-only`, `--ephemeral`, `--ignore-rules`, in an empty temp directory, so it sees only the packet. This is not a hard OS guarantee; the CLI may still write its own local state.
- Never use permission-bypass flags or switch credentials. Never ask the user to paste keys; if logged out, tell them to run `codex login`.
- Report timeout, auth and empty-response failures honestly. Do not auto-retry: failed calls can still use quota.
- Normally one consultation per question; add a follow-up only for a specific unresolved issue.
- Log notable outcomes in `shared/HANDOFF.md` or `shared/DECISIONS.md` when relevant; put unrelated suggestions in `shared/IDEA_INBOX.md`.
- `CODEX_BRIDGE_BIN` overrides the executable path.

Examples: "Ask Codex to review this diff"; "Get Codex's second opinion on the credit-reservation design"; "Have Codex challenge this plan, then tell me what you agree with."
