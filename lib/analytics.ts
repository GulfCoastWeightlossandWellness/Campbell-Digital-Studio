/**
 * Tiny client-side analytics helper for Plausible custom events.
 *
 * Usage:
 *   import { track } from "@/lib/analytics";
 *   track("Lead Magnet Download", { source: "footer" });
 *
 * Renders a no-op if Plausible isn't loaded (no env var, or SSR).
 */

type EventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

export function track(event: string, props?: EventProps): void {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  window.plausible(event, props ? { props } : undefined);
}

/** Standard event names — keep this list short and stable so dashboards stay clean. */
export const EVENT = {
  inquiryFormSubmit: "Inquiry Form Submit",
  calendarBookingStarted: "Calendar Booking Started",
  leadMagnetDownload: "Lead Magnet Download",
  footerEmailCaptured: "Footer Email Captured",
  caseStudyViewed: "Case Study Viewed",
  externalLinkClicked: "External Link Clicked",
} as const;
