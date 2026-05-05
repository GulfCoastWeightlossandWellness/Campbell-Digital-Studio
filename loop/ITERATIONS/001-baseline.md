# Iteration 001 — Bootstrap loop and run baseline assessment

**Date:** 2026-05-05
**Task:** Iteration 001 (bootstrap-only, per loop prompt §01)
**Chunked:** false
**Files changed:** 0 (loop scaffolding only — no code touched)
**Lines changed:** +0 / -0 (the `/loop/` files are documentation, not code)
**Commit:** (set on commit)

## What changed

No code changed. Wrote the `/loop/` scaffolding (12 files), audited the codebase to reconcile the loop prompt's §05 backlog against work already shipped in commit `d0c58b0` (the prior rebuild), seeded `BACKLOG.md` with only the items still open, recorded blockers, mirrored existing `TODO(peyton)` markers into `loop/TODOS.md`, scored the site against the §07 rubric.

## Why

Per loop prompt §01, the first iteration is bootstrap-only: scaffold + baseline + score, no fixes. Mixing bootstrap with code changes would muddy the iteration-001 baseline.

## Score

Initial baseline. See `loop/SCORING.md` for the per-dimension table and notes.

| Dimension              | Score |
|------------------------|------:|
| Editorial cohesion     | 8     |
| Conversion strength    | 6     |
| Mobile experience      | 8     |
| Accessibility          | 7     |
| Performance            | 8     |
| SEO infrastructure     | 8     |
| Content quality        | 6     |
| Social proof           | 4     |
| Code quality           | 8     |
| **Total**              | **63 / 90 (70 / 100)** |

Three of the 8s (Editorial, Mobile, Performance) are conservative self-assessments pending real data — the corresponding audits / Lighthouse runs / axe sweeps are on the BACKLOG.

## Audit findings (the actual baseline assessment)

The loop prompt's §04.2 lists ten "known issues to seed BACKLOG.md with." After auditing the codebase as of `d0c58b0`, the reconciliation is:

| # | §04.2 issue | Status |
|---|-------------|--------|
| 1 | Two different navigation systems | **Already fixed.** Single `Header.tsx`. |
| 2 | Two different footers | **Already fixed.** Single `Footer.tsx`. |
| 3 | `/studio` duplicates the homepage | **Already fixed.** `/studio` 308-redirects to `/#about` per `next.config.ts`. |
| 4 | Voice drift between routes | **Already fixed** (single home). |
| 5 | Canonical URLs are wrong | **Partially open.** Root layout sets `alternates: { canonical: "/" }` which means every sub-route advertises `/` as its canonical. **Added to BACKLOG as [CRITICAL].** |
| 6 | Domain migration not completed | **Open.** ECONNREFUSED at iteration time. **Added to BLOCKERS.** |
| 7 | Email link inconsistency | **Already fixed.** All `mailto:` links read from `siteConfig.email`. |
| 8 | No `siteConfig` module | **Already fixed.** `lib/site-config.ts` exists. |
| 9 | Footer "Send" button unwired | **Already fixed.** `FooterEmailCapture` posts to `/api/lead`; route handles Resend-or-console fallback. |
| 10 | `/method` page state unknown | **Already settled.** `/method` 308-redirects to `/`; nav doesn't reference it. |

Conclusion: 8 of 10 items in the prompt's known-issues list were already addressed before iteration 001 began. Of the remaining two, one is now [CRITICAL] in BACKLOG (per-page canonicals) and one is in BLOCKERS (domain).

### §05 backlog reconciliation

The prompt's §05 lists ~70 individual tasks. Reconciliation is in `loop/COMPLETED.md` (already-shipped) and `loop/BACKLOG.md` (still-open). Roughly:

- §5.1 critical bugs — 4 of 6 already shipped, 1 open as [CRITICAL] (domain), 1 open as [CRITICAL] (canonicals).
- §5.2 theme cohesion — partially shipped; audits still open as [MEDIUM].
- §5.3 conversion infrastructure — most shipped except `/inquire` form (mailto only) and `/playbook` (not built). Both open as [CRITICAL]/[HIGH].
- §5.4 social proof — data-layer + components shipped; real testimonials and results remain BLOCKERS.
- §5.5 case studies — shipped to "structurally complete" depth; results and testimonials are content-blocked.
- §5.6 SEO — most shipped except per-page canonicals + BreadcrumbList.
- §5.7 perf — instrumentation in place; Lighthouse baseline open as [HIGH].
- §5.8 a11y — basics in place; full sweep open as [HIGH].
- §5.9 analytics — instrumentation in place; some events not yet fired (open as [HIGH]/[MEDIUM]).
- §5.10 content — `/notes` route doesn't exist; building a thin scaffold is open as [HIGH].
- §5.11 polish — 404 done; 500 page, print stylesheet, manifest are open as [MEDIUM].

### Drift audit (against §03 / `THEME.md`)

Sampled the home page and case-study page for design-system compliance. No critical drift found. Specific observations:

- All H2s on the home page use the `<em>...</em>` italic sub-clause pattern.
- Section markers (`SectionTag`) precede every major section.
- No off-palette colors, no off-stack fonts, no forbidden patterns (chat widget, exit popup, logo wall, fake reviews, card-named components).
- `EditorialTable` referenced in `globals.css` but no React component file by that name was confirmed — added to BACKLOG as [LOW].

## Blockers introduced

Five, all already known:

1. Domain not serving (ECONNREFUSED).
2. Written testimonial permissions.
3. Real Local Falcon / GSC numbers.
4. Cal.com username.
5. Resend API key.

All have workarounds in place — the loop can keep moving on other tasks. See `loop/BLOCKERS.md`.

## Notes for next iteration

- **Pick the top [CRITICAL] item from BACKLOG.md.** That's "Wire `/inquire` to a real backend (replace mailto)" — sized M, fits in one iteration.
- The per-route canonical fix is the second [CRITICAL] but smaller (S). The loop prompt §2.2 priority order lists "lowest estimated effort wins on ties" — but these aren't ties. Inquire-form impact on conversion outweighs the canonical fix's SEO impact. Inquire wins.
- The `/inquire` form should fire `Inquiry Form Submit` analytics event — wire that in the same iteration to retire one HIGH item with the same change.
- After the inquire form ships, validation must include a real POST through the form to `/api/lead` (the smoke test from iteration `d0c58b0` confirmed the endpoint works in isolation).

## Surprises

None. The codebase is in better shape than the loop prompt's §04.2 list assumed — that list is based on an older snapshot of the site, and the prior rebuild closed most of those issues already.

## Discovered

The loop prompt's §04.2 issue list is significantly out of date with the codebase. This isn't a problem with the prompt — it just means iteration 001's job is genuinely to *reconcile*, not to fix. Future iterations don't need to re-derive this; the reconciled BACKLOG is the source of truth from here forward.
