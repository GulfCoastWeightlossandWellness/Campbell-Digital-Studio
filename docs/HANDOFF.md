# Handoff — Campbell Digital Studio Rebuild

A summary of what changed in this rebuild, why, and how to keep editing.

## What changed

### New routes

| Route        | Notes |
|--------------|-------|
| `/call`      | Cal.com booking page. Embed activates when `NEXT_PUBLIC_CAL_USERNAME` is set, otherwise shows an "email to schedule" fallback. |
| `/api/lead`  | POST endpoint for the footer email capture (and future lead-magnet form). Sends a Resend email when `RESEND_API_KEY` is set; otherwise logs to the Vercel function console so leads aren't lost. |

### New home-page sections

The home stays a single long-scroll page; section numbering went from §01–§07 to §01–§08:

- **§02 Selected Clients** (new) — text-wordmark row of clients with `publicConsent: true`. Auto-hides if fewer than two consenting clients exist.
- **§03 What clients say** (new, conditional) — featured testimonials. Renders nothing when no testimonial has a real quote, so it's invisible until you fill `lib/data/testimonials.ts`.
- §04 Capabilities (was §04, unchanged copy)
- §05 Process (was §05, unchanged copy)
- **§06 Common questions** (new) — accordion FAQ + FAQPage JSON-LD schema (rich-result eligible).
- §07 About (was §06, unchanged copy)
- §08 Contact CTA (was §07, unchanged copy)

### New case-study sections

Inserted between Brief and Selected Screens; each renders only when its data exists:

- **§02 Results** — Cadence block of real metrics from `lib/data/results.ts`.
- **§03 Client voice** — Single testimonial pulled from `lib/data/testimonials.ts`.

A new **Inquire CTA tail** added above Prev/Next, linking to `/inquire` and (when configured) `/call`.

### Mobile improvements

- **Hamburger menu** now closes on Escape and on route change. Tap target is now ≥44×44 px. Overlay z-index raised above the header. A close X button is now visible in the top-right of the open overlay.
- **Sticky mobile CTA bar** (`components/StickyMobileCTA.tsx`) renders only on viewports ≤768 px, hides on `/inquire` and `/call`, hides on scroll-down and reveals on scroll-up, and respects `prefers-reduced-motion`.
- **Footer** has a tap-to-email link, an optional GitHub link, and an inline footer email-capture form (the lowest-friction lead path).

### Bug fixes

See `docs/BUGS_FOUND.md` for the full audit. Highlights:

- `app/sitemap.ts` no longer lists 308-redirected URLs.
- `app/not-found.tsx` no longer links to dead routes.
- `app/layout.tsx` and `app/inquire/page.tsx` no longer hardcode the canonical URL or email — both read from `lib/site-config.ts`.

### Schema and SEO

- `Organization`, `WebSite`, and `Person` JSON-LD added to root layout (`app/layout.tsx`).
- `FAQPage` JSON-LD added on the home page, generated from `lib/data/faq.ts`.
- Twitter Card metadata added.
- `metadataBase` and OG URL now derive from `lib/site-config.ts`.

### Analytics

- Plausible loader (`components/Analytics.tsx`) and tiny `track()` helper (`lib/analytics.ts`) added.
- Both are env-gated — without `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` the script does not render and `track()` is a no-op.
- The footer email capture and the Cal.com embed already call `track()` on success.

## How to keep editing

### Update a testimonial

Edit `lib/data/testimonials.ts`. Each entry has a `quote`, `permission`, and `publicConsent` field. The display sections key off these — an entry with an empty `quote` is automatically excluded from rendering, so leaving the seed entries in place is safe.

To make a testimonial public:
```ts
{
  id: 'reaves-nelson-air-solutions',
  quote: "Verbatim quote here, copy-pasted from email/text.",
  authorName: 'Reaves Nelson',
  authorTitle: 'Owner, Air Solutions Heating & Cooling',
  authorLocation: 'Daphne, AL',
  caseStudySlug: 'air-solutions',
  featured: true,
  permission: 'written',     // ← must be 'written'
  publicConsent: true,       // ← must be true
}
```

### Update Selected Clients

Edit `lib/data/clients.ts`. Set `publicConsent: false` to hide a client; the row auto-hides if fewer than two clients remain. To add a logo, drop it into `public/images/clients/` and set `logoUrl`.

### Update case-study Results

Edit `lib/data/results.ts`. Add `CaseStudyResult` items to the `caseStudyResults[<slug>]` array. The case-study Results section renders automatically when the array is non-empty.

### Update FAQ items

Edit `lib/data/faq.ts`. Both the visible accordion and the JSON-LD schema regenerate automatically. Order matters — first item is open by default.

### Add a project / case study

Same as before: append to the `projects` array in `lib/projects.ts`. Set `featured: true` to make the project render at full case-study depth at `/work/<slug>`. The `next.config.ts` redirect for the slug (if any) needs to be removed if the slug is moving from "redirect to /work" to "render its own page."

### Deploy

Push to `claude/campbell-studio-rebuild-vivol` (this branch). When ready, merge to `main` and Vercel deploys automatically. No build hooks needed.

## How to read the analytics dashboard

Once Plausible is configured, the dashboard at `https://plausible.io/<yourdomain>` shows pageviews and the six custom events the site emits:

| Event | When it fires |
|-------|---------------|
| `Footer Email Captured` | Successful POST to `/api/lead` from the footer form. |
| `Calendar Booking Started` | Cal.com `bookingSuccessful` callback. |
| `Inquiry Form Submit` | Reserved for a future inquire form (the current `/inquire` is mailto-only). |
| `Lead Magnet Download` | Reserved for a future `/playbook` page. |
| `Case Study Viewed` | Reserved — wire from the case-study page if you want this granularity. |
| `External Link Clicked` | Reserved — wire from the work index `Live Site ↗` links if you want this granularity. |

Set up these events as Goals in the Plausible UI to see funnel conversion rates.

## How to migrate to a custom domain

See `docs/DOMAIN_MIGRATION.md`. TL;DR: buy the domain → add it in Vercel → set `NEXT_PUBLIC_SITE_URL` env var → redeploy. The codebase reads the canonical URL from one place (`lib/site-config.ts`) so no code changes are needed.

## Files most likely to need touching next

| When you want to… | Edit |
|-------------------|------|
| Publish a testimonial | `lib/data/testimonials.ts` |
| Add real case-study metrics | `lib/data/results.ts` |
| Tweak FAQ copy | `lib/data/faq.ts` |
| Hide/show a client | `lib/data/clients.ts` |
| Change the contact email | `lib/site-config.ts` |
| Add a service | `app/page.tsx` (capabilitiesBuild array) |
| Add a process step | `app/page.tsx` (processSteps array) |
| Add a project | `lib/projects.ts` |
| Add an env var | `docs/ARCHITECTURE.md` table + `lib/site-config.ts` |

## What's next (if you want to keep building)

A short list of medium-leverage additions, in rough priority order:

1. **Wire `track()` on the work-index `Live Site ↗` links.** Right now the page links open in a new tab without firing an `External Link Clicked` event. Add an `onClick` to the `<Link>` in `app/work/page.tsx`.
2. **Add a real `/inquire` form** (replacing the mailto). The `/api/lead` route already accepts a `source: "inquire"` tag — a richer form would just need a few more fields (business name, current site, budget, timeline) posted to the same endpoint.
3. **Build the lead-magnet page** at `/playbook` once a generic version of the GBP playbook is ready. The route + form would be a 30-minute task; the writing of the playbook PDF is the longer lift.
4. **Add the BreadcrumbList JSON-LD on case-study pages** (`generateMetadata` is already async there, so this is small).
