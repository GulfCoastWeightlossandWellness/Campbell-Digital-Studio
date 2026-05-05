# /loop — Campbell Digital Studio Improvement Protocol

This directory is the institutional memory of an iterative, self-perpetuating improvement protocol for the Campbell Digital Studio site. Every iteration:

1. Reads `STATE.md` to know where we are.
2. Picks the next task from `BACKLOG.md`.
3. Executes (or chunks if too big).
4. Validates (build, lint, typecheck).
5. Re-scores against `SCORING.md`.
6. Writes a per-iteration log to `ITERATIONS/NNN-slug.md`.
7. Commits and stops. **One iteration per session.**

The loop is driven by a single prompt — the only one Peyton needs to paste again. See the project root for the prompt's content; the loop's job is to execute it, one iteration at a time, until a stop condition in `§08` of that prompt is met.

## Files

- **STATE.md** — current iteration, score, focus, recent history. Read first every session.
- **SCORING.md** — rubric and a running table of scores per iteration.
- **BACKLOG.md** — prioritized work, formatted with effort estimates and acceptance criteria.
- **COMPLETED.md** — log of finished tasks with iteration references.
- **BLOCKERS.md** — items that need Peyton's input or out-of-band action; each has a workaround.
- **TODOS.md** — mirror of every `TODO(peyton)` comment in the code, with paths and line numbers.
- **THEME.md** — locked design system (colors, type, components, forbidden patterns).
- **ANALYTICS.md** — event taxonomy. Updated when events are added or renamed.
- **ARCHITECTURE.md** — codebase map. Updated when structure changes.
- **DOMAIN_MIGRATION.md** — migration plan and status for `peytoncampbell.studio`.
- **HANDOFF.md** — long-form summary for any developer or future Claude session.
- **FINAL.md** — written exactly once, when a stop condition is met.
- **ITERATIONS/** — one log per iteration, zero-padded.

## Conventions

- Iteration numbering is zero-padded to 3 digits (`001`, `002`, …).
- Commit format: `{type}({scope}): {summary} (iteration NNN)` with a longer body. See the prompt §2.9.
- Branch: `claude/campbell-studio-rebuild-vivol` (per the durable instruction). Iterations push directly to this branch; `main` is fast-forwarded periodically.
- Package manager: **npm**. Validation commands: `npm run lint`, `npm run build`. There is no `npm run typecheck` script — type checking runs as part of `next build`.
