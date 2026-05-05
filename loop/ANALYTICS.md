# Analytics — Event Taxonomy

The studio uses Plausible for analytics, gated by `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Custom events are emitted via the `track()` helper in `lib/analytics.ts`.

## Event constants

Defined in `lib/analytics.ts`:

```ts
export const EVENT = {
  inquiryFormSubmit: "Inquiry Form Submit",
  calendarBookingStarted: "Calendar Booking Started",
  leadMagnetDownload: "Lead Magnet Download",
  footerEmailCaptured: "Footer Email Captured",
  caseStudyViewed: "Case Study Viewed",
  externalLinkClicked: "External Link Clicked",
} as const;
```

## Where each fires

| Event                       | Fires from                                   | Status (iter 001)            |
|-----------------------------|----------------------------------------------|------------------------------|
| `Footer Email Captured`     | `components/FooterEmailCapture.tsx` on POST success | **wired** |
| `Calendar Booking Started`  | `components/CalEmbed.tsx` on `bookingSuccessful` callback | **wired (when Cal embed renders)** |
| `Inquiry Form Submit`       | `app/inquire/page.tsx` on form post (form not yet built) | **pending** |
| `Lead Magnet Download`      | `app/playbook/page.tsx` on email capture (route not yet built) | **pending** |
| `Case Study Viewed`         | `app/work/[slug]/page.tsx` on mount | **pending** |
| `External Link Clicked`     | `app/work/page.tsx` on `Live Site ↗` click; case-study `Visit live project ↗`  | **pending** |

## Standard prop shapes

Keep these stable across iterations so dashboards don't fragment:

```ts
// Footer Email Captured
{ source: "footer" }                        // always

// Calendar Booking Started
{ source: "cal-page" | "case-study-cta" | "hero-cta" | "sticky-mobile-cta" }

// Inquiry Form Submit
{ source: "inquire-page" | "case-study-tail" | "footer", referrer?: string }

// Lead Magnet Download
{ source: "playbook" | "case-study-sidebar" | "footer" }

// Case Study Viewed
{ slug: string, referrer?: string }

// External Link Clicked
{ destination: string,                      // the absolute URL
  slug?: string,                            // case-study slug, if applicable
  context: "work-index" | "case-study" | "footer" }
```

## Goals to set in Plausible UI (after first events arrive)

In Plausible's Goals tab, register these custom events as goals so the funnel view works:

1. `Inquiry Form Submit` — primary conversion
2. `Calendar Booking Started` — primary conversion
3. `Lead Magnet Download` — secondary conversion
4. `Footer Email Captured` — secondary conversion

External Link Clicked and Case Study Viewed stay un-goal'd — they're engagement signals, not conversions.

## Things deliberately not tracked

- Pageviews on `/api/lead` — the route is not user-facing; Plausible auto-tracks page navigations only.
- 404s — Plausible already shows 404s in the standard UI, no custom event needed.
- Scroll depth — too noisy without per-section instrumentation; deferred indefinitely.

## When adding a new event

1. Add the constant to `EVENT` in `lib/analytics.ts`.
2. Update the table above with where it fires + the prop shape.
3. Add it to the loop prompt §12.2 list if it's a primary funnel event.
4. After the next deploy, register it as a Goal in Plausible.
