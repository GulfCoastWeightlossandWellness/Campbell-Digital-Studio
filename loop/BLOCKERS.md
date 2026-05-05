# Blockers

Items that require Peyton's input or out-of-band action. Each has a workaround so the loop can keep moving on other tasks.

## [2026-05-05] Domain `peytoncampbell.studio` not yet serving

**Iteration discovered:** 001
**Why blocked:** Direct `curl` to the domain returns ECONNREFUSED. Vercel project is still serving on `campbell-digital-studio.vercel.app`. Until DNS + Vercel custom-domain are configured, every social share, OG card, JSON-LD URL, and outbound email link points at the staging URL.
**Suggested ask (paste back to Claude or Vercel dashboard):** "Domain registered at \[registrar\]. Vercel custom-domain assignment + DNS records pending. Set `NEXT_PUBLIC_SITE_URL=https://peytoncampbell.studio` in Vercel Production env once domain serves 200."
**Workaround in place:** `lib/site-config.ts` falls back to `https://campbell-digital-studio.vercel.app`. Once DNS lands and the env var is set, no code change is needed.
**Severity:** Non-blocking (loop can keep moving) but **Tier-1 priority** — every iteration still happens against the staging URL.

## [2026-05-05] Written testimonial permissions

**Iteration discovered:** 001
**Why blocked:** `lib/data/testimonials.ts` has two seed entries with empty `quote` fields. Owner needs to obtain verbatim quotes + written permission from at least Reaves Nelson (Air Solutions) and a Revitalize principal before the home-page testimonial section and the case-study Client-Voice slot will render.
**Suggested ask:** "Email Reaves: 'Would you write 1–3 sentences about working with me on Air Solutions, and let me publish that on my studio site under your name and title? Reply with the text and a yes is enough.' Same for Revitalize."
**Workaround in place:** Sections render nothing when `quote` is empty; the absence is invisible (no placeholder slot). When a testimonial lands, paste it into the file and commit — section auto-appears.
**Severity:** Non-blocking. Limits Social-Proof score ceiling at 4–5/10.

## [2026-05-05] Real Local Falcon / GSC numbers for Air Solutions and Revitalize

**Iteration discovered:** 001
**Why blocked:** `lib/data/results.ts` has empty arrays for both featured slugs. Without real metrics, the case-study Results section is hidden.
**Suggested ask:** "After next Local Falcon scan, paste 3 metrics for `air-solutions` (e.g. SoLV, ARP, grid coverage) into `lib/data/results.ts`. Same shape for `revitalize` once GSC has 30+ days of data."
**Workaround in place:** Results section auto-hides on empty array.
**Severity:** Non-blocking. Limits Content-quality and Social-proof score ceilings.

## [2026-05-05] Cal.com username

**Iteration discovered:** 001
**Why blocked:** `/call` shows an "email to schedule" fallback because `NEXT_PUBLIC_CAL_USERNAME` isn't set. Hero secondary CTA, sticky mobile bar, and case-study tail CTAs all conditionally hide the booking link.
**Suggested ask:** "Create a Cal.com account, set up a 20-min event, set `NEXT_PUBLIC_CAL_USERNAME=peytoncampbell` (or `peytoncampbell/20min`) in Vercel env."
**Workaround in place:** Email fallback on `/call`. Fast for Peyton to flip on later.
**Severity:** Non-blocking. Limits Conversion score ceiling.

## [2026-05-05] Resend API key (for `/api/lead` email delivery)

**Iteration discovered:** 001
**Why blocked:** Without `RESEND_API_KEY`, leads from the footer form (and future `/playbook` form) are only logged to the Vercel function console. Owner won't see them in real time.
**Suggested ask:** "Sign up at https://resend.com (free tier, 3000 emails/month). After domain migration, verify `peytoncampbell.studio` and add `RESEND_API_KEY` and `LEAD_FROM_EMAIL=noreply@peytoncampbell.studio` to Vercel env."
**Workaround in place:** Server logs every lead. The user-facing form still confirms success either way.
**Severity:** Non-blocking. Reduces Conversion-strength reliability score by ~1.

## [2026-05-05] (Soft) Decision: keep `/practice`, `/method`, `/notes` as redirects, or build them as real pages?

**Iteration discovered:** 001
**Why blocked:** Loop prompt §04.2 issue #10 + §05.10 imply standalone pages. The prior rebuild deliberately collapsed them into long-scroll anchors. Until Peyton picks an IA, the loop can't reasonably both (a) audit subpages and (b) leave the redirects in place.
**Suggested ask:** "Long-scroll home, redirects stay in place" OR "Build standalone pages and update nav."
**Workaround in place:** Loop is operating under the assumption that the long-scroll IA holds. The `/notes` task in BACKLOG is sized to build a thin standalone page only — the only one that sits comfortably as a separate route (essays vs short-form positioning).
**Severity:** Non-blocking — but blocks low-priority backlog items.
