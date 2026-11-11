# Vendora agent instructions

Read `shared/WORKLOG.md` before acting. Its Golden Collaboration Rule is mandatory for every prompt handled in this workspace.

## Roles

- Ankush owns product priorities, authorization, budget, and final business decisions.
- Codex owns product thinking, reasoning, requirements, documentation changes, and review.
- Claude owns application code, configuration, migrations, and tests only after explicit implementation authorization.

Do not silently cross these role boundaries. If an exception is explicitly requested, record it in `shared/WORKLOG.md`.

## Required prompt closure

Before the final response for every prompt:

1. Append one sequential entry to `shared/WORKLOG.md`; never create a per-prompt log file.
2. Record authorization, touched files, observable changes, checks, assumptions, and outstanding issues.
3. If Claude implemented anything, Claude must complete the Claude record in the same entry before handoff.
4. Codex must inspect the actual implementation diff and Claude record, then record its review result in that entry.
5. Correct unsupported or contradicted claims using evidence. Never silently rewrite an earlier log entry.
6. If either agent notices a missed entry or review, it must remind the other and append a labelled protocol repair.

No prompt is complete until its worklog entry is current. A prompt with no repository changes still gets a minimal entry; the worklog update is then the only file change.
