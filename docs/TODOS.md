# Open TODOs (Owner Action Required)

A consolidated list of every `// TODO(peyton):` left in the codebase plus business-side items that need owner judgment. Roughly ordered by funnel impact.

## High-impact (will measurably improve conversion)

### 1. Confirm written testimonial permission from at least one client

Currently `lib/data/testimonials.ts` has two seed entries (Reaves Nelson / Air Solutions, Revitalize principal) with `quote: ""` and `publicConsent: false`. Until both are filled in, the home-page "What clients say" section and the per-case-study testimonial slot render nothing — the section is invisible, not empty.

**Action:**
- Get verbatim text + written permission (text/email is fine; keep a copy).
- Edit `lib/data/testimonials.ts`: paste the quote into `quote`, set `permission: 'written'`, set `publicConsent: true`.
- The home and case-study pages will pick it up automatically.

### 2. Capture and paste real Local Falcon / GSC numbers for Air Solutions

`lib/data/results.ts` has an empty array for `air-solutions`. Until populated, the case-study Results block is hidden.

**Action:**
- After the next Local Falcon scan, paste 3 metrics (label/value/detail) into `caseStudyResults['air-solutions']` per the example shape in the file.
- Same for `revitalize` once GSC has 30+ days of data.

### 3. Decide on a Cal.com username

`/call` shows an "email to schedule" fallback right now. If you want a calendar embed:

**Action:**
- Create a Cal.com account, set up a 20-minute event type (e.g. `peytoncampbell/20min`).
- Set `NEXT_PUBLIC_CAL_USERNAME=peytoncampbell` (or whatever username) in Vercel env.
- Optionally `NEXT_PUBLIC_CAL_USERNAME=peytoncampbell/20min` to point at a specific event type.
- Redeploy. The hero secondary CTA, the case-study tail CTA, the sticky mobile bar primary CTA, and `/call` itself will all switch to the embed.

### 4. Wire Resend for footer email capture + future lead magnet

The footer email-capture form posts to `/api/lead`, which already accepts submissions and logs them server-side. Without `RESEND_API_KEY`, leads are only in the Vercel function logs.

**Action:**
- Sign up at Resend (free tier is 3,000 emails/month).
- Verify a domain (after the custom domain migration — see `docs/DOMAIN_MIGRATION.md`).
- Set `RESEND_API_KEY` and optionally `LEAD_NOTIFY_EMAIL` and `LEAD_FROM_EMAIL` in Vercel env.

### 5. Set up Plausible analytics

Without analytics there's no way to tell which step of the funnel is leaking.

**Action:**
- Sign up at Plausible (or use Vercel Analytics if you're already on Vercel Pro).
- Add the domain.
- Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com` in Vercel env.
- The script + custom-event helpers in `lib/analytics.ts` activate automatically.

## Medium-impact (improves trust signal)

### 6. Real client logos for Selected Clients row

Currently the Selected Clients row renders text wordmarks. That's intentional and reads as confident — but real SVG logos would tighten it.

**Action:** drop SVGs into `public/images/clients/`, then add `logoUrl: "/images/clients/foo.svg"` to the matching entry in `lib/data/clients.ts`. The component will need a small tweak to use `<Image />` when `logoUrl` is set; reach out and I'll make the change.

### 7. Verify FAQ answers

`lib/data/faq.ts` has eight Q&A items. Pricing, timeline, and policy answers are written conservatively — but you should read every one for accuracy before they ship as authoritative on the live site (and as JSON-LD in Google's index).

### 8. Decide GitHub visibility

If you want the GitHub link rendered in the footer, set `NEXT_PUBLIC_GITHUB_USERNAME=yourhandle` in Vercel env. If you'd rather keep it private, leave the env var unset and the link is omitted entirely.

### 9. About-section credentials

`app/page.tsx` §07 has a vague "physician based in coastal Alabama with a development background" paragraph. If you want the more specific "PGY-1 Family Medicine resident" or institution detail surfaced, edit the prose there directly.

## Low-priority (nice to have)

### 10. Lead-magnet page (`/playbook`) — currently not built

The rebuild brief proposed a `/playbook` route delivering a generic GBP playbook PDF in exchange for an email. We did not build it because the source `AirSolutionsPros_GBP_Playbook.html` referenced in the brief isn't in this repo. If you want it:
- Decide whether to (a) generalize the Air Solutions playbook, or (b) write a new generic version.
- Drop the HTML or PDF into `public/downloads/`.
- Reach out to wire the page + form (the `/api/lead` route already supports a `source: "playbook"` tag).

### 11. Real portrait + workspace photography

The about section is text-only right now. A portrait of you and a workspace shot would warm it up. Drop them into `public/images/site/` and tell me where to land them.

### 12. Custom domain (see `docs/DOMAIN_MIGRATION.md`)

The whole codebase is set up to migrate in a single env-var swap. Buy the domain whenever you're ready.

## Code-level TODO comments left in the repo

Grep the codebase for `TODO(peyton)` to find them in context. As of this rebuild they're concentrated in:

- `lib/data/testimonials.ts` — two seed entries waiting for verbatim quotes + written permission
- `lib/data/results.ts` — two seed slugs waiting for real numbers
