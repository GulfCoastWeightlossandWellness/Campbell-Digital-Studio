# Hand-off — Campbell Digital Studio Improvement Loop

A long-form summary readable by any developer or future Claude session.

## What this directory is

`/loop` is the institutional memory of a self-perpetuating improvement protocol. Every "session" with Claude Code runs **exactly one iteration**, then stops. The next session reads the same files, picks up where the last one left off.

The whole protocol lives in a single prompt that Peyton pastes at the start of each session. The prompt is in section 5 of the project root's `AGENTS.md` (or wherever Peyton stores it). The loop's job is to execute that prompt one iteration at a time.

## How to run an iteration (operator's view)

1. Open Claude Code on the repo.
2. Paste the loop prompt.
3. Wait — Claude reads `/loop/STATE.md`, picks the next BACKLOG item, executes it, validates, logs, scores, commits, and stops.
4. Read the latest entry in `/loop/ITERATIONS/`.
5. Pick a different time and paste the prompt again. Repeat.

The loop ends when one of the §08 stop conditions in the prompt is met (score ≥85/90 sustained, backlog drained, etc.). When it ends, `/loop/FINAL.md` is written.

## How to interrupt the loop (owner's view)

- **Pause it:** stop pasting the prompt. The state files persist; resume any time.
- **Stop it permanently:** create `/loop/STOP.md` with any contents. The next iteration sees this file and immediately writes `FINAL.md`, commits, and exits.
- **Take over manually:** push commits directly. The loop's next iteration will read git history and reconcile.

## How to read the loop state

Quickest path:

1. Read `STATE.md` — current iteration, score, focus.
2. Read `SCORING.md` — score history, per-dimension notes.
3. Read the last 1–2 logs in `ITERATIONS/`.

For a deep audit:

4. Read `BACKLOG.md` — what's planned.
5. Read `BLOCKERS.md` — what's waiting on Peyton.
6. Read `COMPLETED.md` — what's done (cross-referenced to commits).

## Loop discipline

The loop's value comes from doing it consistently. It loses value when:

- Iterations get bundled (one session = one iteration; chunk if big — see prompt §2.3).
- The score is not updated (the trend line is the diagnostic).
- BLOCKERS aren't recorded (the loop will revisit the same blocked item until it's flagged).
- The design system drifts (drift compounds).

If Claude or the operator notices any of these slipping, the right move is to fix it on the *next* iteration as a small explicit task — not to retroactively fix the slipping iteration.

## What's already shipped

See `COMPLETED.md`. Highlights:

- Single nav, single footer, design tokens centralized.
- Long-scroll home with §01–§08, FAQ section + JSON-LD, Selected Clients row.
- Case-study template with auto-hiding Results + Testimonial sections.
- Footer email capture wired to `/api/lead`.
- Cal.com embed at `/call` (env-gated).
- Plausible analytics (env-gated).
- Sticky mobile bottom-bar CTA.
- Mobile hamburger with Escape + route-change close.
- Sitemap, robots, JSON-LD all reading from `siteConfig`.

## What's planned next (top of the backlog)

1. Wire `/inquire` to a real form posting to `/api/lead` (currently mailto only).
2. Add per-route canonical URL overrides.
3. Add BreadcrumbList JSON-LD on case-study pages.
4. Add a skip-to-main-content link.
5. Build `/playbook` lead-magnet page (route + form, PDF deferred).
6. Run a Lighthouse baseline.
7. Run an axe-core a11y sweep.

See `BACKLOG.md` for the full list and effort estimates.

## What's blocked on Peyton

See `BLOCKERS.md`. Highlights:

- `peytoncampbell.studio` not yet serving (DNS + Vercel custom domain).
- Written testimonial permissions from Reaves Nelson and Revitalize.
- Real Local Falcon / GSC metrics.
- Cal.com username (env var).
- Resend API key.

None of these block the loop's progress on other items.

## Stop conditions in plain English

The loop stops when **any of these** is true:

- The site scores ≥85/90 for two iterations in a row (we're at 63/90, so 22 points away).
- The backlog is empty AND the score is ≥80/100.
- Three iterations in a row produce zero score change.
- The next 3 backlog items all need owner input that hasn't arrived.
- Peyton creates `/loop/STOP.md`.

## Voice and design system

Locked in `THEME.md`. Don't drift. If a new pattern is needed, document the addition in `THEME.md` with rationale before using it.

The studio voice is: **specific, calm, slightly understated, occasionally dry**. Re-read `app/page.tsx` if uncertain.
