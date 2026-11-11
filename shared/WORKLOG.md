# Vendora shared worklog

This is the single, continuous prompt-level record for Ankush, Codex, and Claude. Append entries at the bottom. Do not create a separate report for each prompt.

## Golden Collaboration Rule

1. Every prompt handled in this workspace receives one sequential `P-NNN` entry before the final response.
2. Codex records reasoning outcomes, documentation changes, evidence, assumptions, and review results.
3. Claude records application implementation, configuration, migrations, checks, assumptions, and deviations in the same entry when Claude is involved. If no Claude implementation occurred, the entry says so explicitly.
4. Claude does not implement without explicit authorization. Codex does not claim implementation it did not perform.
5. After Claude implements, Codex reviews both the actual diff and Claude's record. A summary alone is not a diff review.
6. Both agents challenge inaccurate claims. Use the evidence states below instead of making an unsupported “hallucination” accusation.
7. If either agent forgets the protocol, the other must remind them and append a `Protocol repair` note. Reconstructed records are labelled as reconstructed rather than presented as contemporaneous.
8. Earlier entries are append-only. Corrections are new addenda referencing the original entry; they are never silently rewritten.
9. Never place secrets, credentials, access tokens, or real customer data in this log.

### Evidence vocabulary

- **Verified:** directly observed; name the file, command, output, or user instruction.
- **Contradicted:** available evidence conflicts with the claim; cite the conflict.
- **Unsupported:** no supporting evidence was found; the claim may still be true.
- **Unverifiable:** available access is insufficient to check the claim.

The flagged party answers with `confirmed-and-corrected`, `disputed-with-evidence`, or `withdrawn`. Unresolved disputes go to `shared/HANDOFF.md` for Ankush to decide.

### Diff review standard

When Git history is available, record the compared range plus `git status`, the relevant diff, and check results. Without Git, the implementer must identify every touched file and provide a before/after basis; Codex reviews the actual file contents and available patch/snapshot evidence. In either case Codex must:

- confirm the touched-file list is complete;
- compare each implementation change with the authorized scope;
- map implementation claims to observable changes;
- distinguish checks Codex reran from results it only read;
- record findings and an `accepted`, `accepted-with-notes`, or `changes-requested` result.

If the actual comparison is unavailable, record `Diff reviewed: no` and the reason. Never infer a successful review from a prose summary.

### Relationship to other shared files

- `WORKLOG.md`: every-prompt audit of actions, claims, evidence, and review.
- `CHANGELOG.md`: material product/repository outcomes only, with a worklog reference where useful.
- `HANDOFF.md`: current state, blockers, and next action—not historical narration.
- `DECISIONS.md`: accepted decisions and their rationale.

On conflict, inspect the actual repository state and latest explicit user instruction. Repair stale summaries and record the repair here.

### Entry template

```markdown
## P-NNN | YYYY-MM-DD | Short title

**Prompt:** Verbatim text or a labelled concise paraphrase.  
**Authorization:** None, docs-only, or implementation authorization with source.  
**Files touched:** Paths, or “none besides this worklog entry.”

### Codex record

- Changed:
- Outcome/reasoning:
- Evidence:
- Assumptions/unverified:

### Claude record

- Implemented:
- Checks run:
- Assumptions/unverified:
- Scope deviations:
- Challenges to Codex claims:

### Codex review

- Diff reviewed:
- Worklog claims reviewed:
- Checks rerun/read:
- Findings and evidence-state corrections:
- Result: accepted | accepted-with-notes | changes-requested | not applicable

### Closure

- `CHANGELOG.md`: updated | not needed
- `HANDOFF.md`: updated | not needed
- Protocol compliance: complete | repaired, with explanation
```

For a pure Q&A prompt, keep the entry short but retain every field. “No repository change” means no change besides this required worklog entry.

## Entries

## P-001 | 2026-11-11 | Adopt the Golden Collaboration Rule

**Prompt:** Concise paraphrase — Ankush required Codex and Claude to maintain one Markdown record after every prompt, preserve their reasoning/coding role split, review implementation diffs and change records, correct each other's unsupported claims, and remind/repair when either forgets.  
**Authorization:** Documentation-only protocol changes. No application implementation was requested or authorized.  
**Files touched:** `AGENTS.md`, `CLAUDE.md`, `README.md`, `shared/WORKLOG.md`, `shared/HANDOFF.md`, `shared/START_CLAUDE.md`, `shared/TASKS.md`, `shared/CHANGELOG.md`.

### Codex record

- Changed: Established this canonical worklog and linked the mandatory protocol from both Codex-facing and Claude-facing instructions.
- Outcome/reasoning: One append-only entry per prompt; Claude records implementation in the same entry; Codex reviews observable diffs and claims; both use fixed evidence vocabulary and repair omissions.
- Evidence: Ankush's current instruction; current `CLAUDE.md`, `README.md`, `shared/HANDOFF.md`, and the local Claude consultation captured for this prompt.
- Assumptions/unverified: “After every prompt” is interpreted as every prompt handled in this workspace. Claude is not invoked merely to fill an empty implementation section; prompts without Claude implementation explicitly say `not applicable`.

### Claude record

- Implemented: No application code. Claude was consulted for protocol review; Codex transcribed the supported recommendations into this documentation because the bridge is advisory and cannot edit files.
- Checks run: Claude did not run repository commands or inspect files; its review was based only on the supplied packet.
- Assumptions/unverified: Claude noted that this folder was reported as not being a Git worktree, so the protocol includes a non-Git comparison fallback.
- Scope deviations: None.
- Challenges to Codex claims: Use `verified`, `contradicted`, `unsupported`, and `unverifiable` rather than declaring “hallucination” without evidence; keep worklog, changelog, and handoff responsibilities distinct.

### Codex review

- Diff reviewed: Self-review of documentation changes using the applied patch and direct file inspection; there is no application implementation diff.
- Worklog claims reviewed: Claude's recommendations were read from the completed bridge result. Claims of repository inspection or command execution by Claude were deliberately excluded.
- Checks rerun/read: Codex will run direct file-existence, reference, temporary-file, and formatting checks after applying this entry; the final observed result is recorded in the closure addendum below.
- Findings and evidence-state corrections: Verified that Claude was advisory only. The rule therefore requires Claude-authored implementation records only when Claude actually implements.
- Result: accepted-with-notes — independent review is limited because Codex authored the documentation; Claude supplied an advisory challenge but did not inspect the resulting files.

### Closure

- `CHANGELOG.md`: updated with the material protocol adoption.
- `HANDOFF.md`: updated to make the worklog mandatory before each task and handoff.
- Protocol compliance: complete, pending recorded validation results below.

#### Validation addendum to P-001

- Verified all eight reported touched files exist and the temporary Claude packet was removed.
- Verified worklog and Golden Rule references across `AGENTS.md`, `CLAUDE.md`, `README.md`, handoff, startup prompt, task board, and changelog using `rg`.
- Searched the changed instruction/shared Markdown set for common credential patterns; only policy text mentioning access tokens was found.
- Confirmed this directory is not a Git worktree, so no Git diff or `git diff --check` was available. Review used the applied patch plus direct content inspection.
- Final protocol status: complete. No application implementation occurred.
