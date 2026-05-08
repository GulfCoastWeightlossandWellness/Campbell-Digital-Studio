# Iteration 005 — Wire `/inquire` to a real backend (replace mailto)

**Date:** 2026-05-05
**Task:** [CRITICAL] Wire `/inquire` to a real backend (replace mailto) — top of BACKLOG, M effort, Tier-2 funnel impact.
**Chunked:** false
**Files changed:** 2 source + 5 loop docs
**Lines changed:** +330 / -65

## What changed

### `components/InquireForm.tsx` (new, ~310 lines)

Client component implementing the studio's first real inquiry form. Eight fields (one required name, required email, required business, optional current site, optional business type, required goals, optional budget, optional timeline), each with a labeled mono-uppercase eyebrow, paper-rule-bordered input, gold-600 focus ring, and a 16px input font (prevents iOS zoom-on-focus).

State machine: `idle → submitting → success | error`. On success, the form is replaced in-place by an editorial thank-you block ("Thanks{, name} — *I'll be in touch within a week.*"). On error, a `role="alert"` message renders at the top of the form with WCAG-compliant contrast.

Submission posts to the existing `/api/lead` route with a structured multi-line `note` field built from the form's eight values plus `source: "inquire"`. No API contract change required — the existing route's Resend-or-console fallback covers both production and unconfigured states.

Wires the previously-defined-but-never-fired `EVENT.inquiryFormSubmit` analytics event on success.

Accessibility:
- Every input has an associated `<label htmlFor>` matched with `id`.
- Required fields marked with `*` (gold-600); optional fields marked with `(optional)` (ink-mute).
- Error messages associated via `aria-describedby` and rendered with `role="alert"`.
- Submit button has a 44×44 minimum click target and a clear loading/disabled state.
- Single-column on viewports ≤720px so form stays usable at narrow widths.

### `app/inquire/page.tsx` (rewritten)

Removed the mailto button. Mounted `<InquireForm />` in its place. Slight copy update: the intro paragraph now says "the fields below ask for the same things I'd ask on a first call" instead of "send an email with a few specifics." Same voice, just adapted to the form.

Added `alternates: { canonical: "/inquire" }` to the page metadata — partially addresses the existing [CRITICAL] BACKLOG item ("Audit and standardize per-route canonical URLs"). Other routes still need this treatment.

The "Project fit" section at the bottom now also surfaces a `Or book a 20-min call →` link when `siteConfig.calUsername` is set.

### `/api/lead` route — unchanged

The existing handler accepts `{ email, note, source }` and the new form fits cleanly. No edit needed.

## Why

Tier-2 (Conversion) is the highest-priority open dimension. The previous mailto-only `/inquire` was a hidden conversion leak: any prospect whose browser couldn't open a default mail client (a webmail-only laptop, a corporate device with mailto disabled, an iOS Safari without Mail configured) silently lost the inquiry. A real form posting to a real endpoint can't lose leads to client-side mail handler failures — the worst case is a server log Peyton can grep.

Same eight fields the mailto template asked for, plus email + name (which were implicit in the mailto sender). Form structure mirrors the studio's voice — calm, specific, no marketing fluff.

## Score delta

| Dimension              | Before | After | Delta |
|------------------------|-------:|------:|------:|
| 2. Conversion strength | 7      | 8     | +1    |
| **Total**              | 69     | 70    | +1    |
| **/100**               | 77     | 78    | +1    |

Notes:

- **Conversion 7 → 8.** Per rubric: "Form + booking + lead magnet." Currently has form (real, this iter) + booking (env-gated /call) + footer email-capture (acts as lead-magnet-adjacent). Reaching Conv 9 ("Four working paths, all measured") needs the `/playbook` lead magnet built.
- **Code quality steady at 8** despite the new component being cleanly typed + accessible — the rubric's 9 requires "Reusable design system + tests," and there are no tests yet.

## Notes for next iteration

- **Top of BACKLOG remains:** the [CRITICAL] per-route canonicals item. Already partially addressed in this iter (`/inquire` got `canonical: "/inquire"`); next iteration should sweep the other routes (`/`, `/work`, `/work/[slug]`, `/call`).
- After that, the queue runs through owner-directed Projects A–D (Showcase home, Buttons, Multi-page IA, Mobile audit). Recommended order: A.1 Showcase build, then C.1 IA plan, then through.
- The mailto fallback below the submit button uses `siteConfig.email`; once domain migration completes and the studio's email domain changes, that updates automatically.

## Blockers introduced

None.

## Surprises

None. The `/api/lead` route's existing accept-anything-into-`note` design happily took the structured 8-field string. No refactor needed.

## Discovered

- `/inquire` had no `alternates: { canonical }` previously, so it was inheriting `metadataBase + "/"` — the home canonical. Same bug exists on `/work`, `/work/[slug]`, `/call`. Marked for the next iteration.
- The rubric's "all measured" criterion for Conv 9 is partially met: 3 of the 4 conversion paths fire analytics events (Footer Email, Inquiry Form, Calendar Booking). Sticky-mobile-CTA paths fire on the destination page they link to. The only un-measured "path" is `Lead Magnet Download` (no playbook page exists yet). Wiring `Case Study Viewed` and `External Link Clicked` is a [MEDIUM] in BACKLOG, also helps that score.
