/**
 * Per-case-study real results.
 *
 * Rules:
 *   - Never invent numbers. Use verified counts from the source repos and the
 *     project briefs. When no real metric is available, ship an honest
 *     "measurement pending" cell rather than a fabricated number.
 *   - Build-shape facts (route counts, app counts, component counts) are safe
 *     to publish — they come from the source repos and are verifiable.
 *   - Outcome metrics (GSC impressions, GA4 sessions, Local Falcon SoLV,
 *     conversion lift) require a captured snapshot. Leave the array empty or
 *     ship a "pending" cell when the measurement window hasn't closed.
 *   - When `getResultsForSlug(slug)` returns an empty array, the case-study
 *     Results section MUST be omitted entirely.
 *   - Each result is rendered as a Cadence cell (label / value / detail).
 */

export type CaseStudyResult = {
  /** Short metric label (renders mono uppercase) */
  label: string;
  /** The metric value (renders Fraunces, large) */
  value: string;
  /** Short context: where this came from, what it means */
  detail?: string;
  /** Optional ISO date the metric was captured */
  capturedAt?: string;
  /**
   * When `pending: true`, the cell renders in a muted "measurement window
   * still open" treatment instead of a hard metric.
   */
  pending?: boolean;
};

/**
 * Keyed by project slug. Build-shape facts populated from verified source
 * repos. Outcome metrics added as measurement windows close.
 */
export const caseStudyResults: Record<string, CaseStudyResult[]> = {
  "air-solutions": [
    {
      label: "Routes shipped",
      value: "159",
      detail: "15 cities × 9 services + service/city/seasonal hubs + tools",
      capturedAt: "2026-05",
    },
    {
      label: "Programmatic matrix",
      value: "15 × 9",
      detail: "Every Baldwin County city × every HVAC service, individually routed",
      capturedAt: "2026-05",
    },
    {
      label: "Custom interactive tools",
      value: "4",
      detail: "3D AC Explorer · Diagnostic Quiz · ROI Calculator · Financing Estimator",
    },
    {
      label: "Schema architecture",
      value: "9 types",
      detail: "HVACBusiness subtype, OfferCatalog, per-city postalCode arrays",
    },
    {
      label: "Local SEO directory integrity",
      value: "30+ NAP",
      detail: "Synced across the directory ecosystem",
    },
    {
      label: "GBP API automation",
      value: "Filed",
      detail: "Case 9-5827000041281 · review window open",
      capturedAt: "2026-05-19",
    },
    {
      label: "Local Falcon SoLV (post-launch)",
      value: "Day 90 report",
      detail: "Tracking dashboard captures GSC + GA4 + Local Falcon at 30/60/90",
      pending: true,
    },
  ],
  revitalize: [
    {
      label: "Routes shipped",
      value: "72",
      detail: "page.tsx routes across the clinical platform",
      capturedAt: "2026-05",
    },
    {
      label: "Custom components",
      value: "23",
      detail: "Shared across the four connected properties",
      capturedAt: "2026-05",
    },
    {
      label: "Connected entities",
      value: "5",
      detail: "2 clinics + supplement brand + published book + coaching institute",
    },
    {
      label: "Service pages",
      value: "18",
      detail: "Each named service has a dedicated, indexable page",
    },
    {
      label: "Stack",
      value: "Next.js 16 / React 19",
      detail: "Migrated from a template medspa site",
    },
    {
      label: "Post-launch GSC + GA4",
      value: "Day 90 report",
      detail: "Tracking dashboard captures GSC + GA4 at 30/60/90",
      pending: true,
    },
  ],
  "ihe-marketing": [
    {
      label: "Site type",
      value: "Storefront",
      detail: "Public marketing surface for the IHE product line",
    },
    {
      label: "Funnel",
      value: "Landing → Bundles → Dashboard",
      detail: "Three-step routing from interest to product",
    },
    {
      label: "Conversion + traffic",
      value: "Day 90 report",
      detail: "Tracking dashboard captures GSC + GA4 at 30/60/90",
      pending: true,
    },
  ],
  "ihe-dashboard": [
    {
      label: "Patient-education apps shipped",
      value: "146",
      detail: "Verified from AppList.ts source of truth",
      capturedAt: "2026-05",
    },
    {
      label: "Build duration",
      value: "~12 months",
      detail: "Solo, evenings + weekends, during family-medicine residency",
    },
    {
      label: "Stack across apps",
      value: "React + TypeScript",
      detail: "Unified across the full library — one registrar, one taxonomy",
    },
    {
      label: "Categories",
      value: "Canonical",
      detail: "Single taxonomy applied across the whole library",
    },
  ],
  acexperts: [
    {
      label: "Service pages",
      value: "7",
      detail: "Each dedicated, indexable, internally linked",
    },
    {
      label: "City coverage",
      value: "8",
      detail: "Full Baldwin County footprint",
    },
    {
      label: "Custom interactive tools",
      value: "3",
      detail: "3D AC diagnostic · Quiz · ROI calculator",
    },
    {
      label: "Lead capture",
      value: "Sheets-backed",
      detail: "Google Sheets API with Cloudflare Turnstile + Zod validation",
    },
    {
      label: "CI",
      value: "Lighthouse",
      detail: "Lighthouse CI on every commit",
    },
  ],
  "collective-counseling": [
    {
      label: "Pages",
      value: "Multi-page",
      detail: "Homepage + therapy + ADHD testing + addiction counseling",
    },
    {
      label: "Specialty positioning",
      value: "Adult ADHD",
      detail: "Cash-pay landing page with dedicated SEO",
    },
    {
      label: "Local SEO",
      value: "Daphne + Baldwin County",
      detail: "Geo-targeted around the practice's catchment",
    },
  ],
  "blessed-barbershop": [
    {
      label: "Load time on 3G",
      value: "<1s",
      detail: "WebP-optimized media, lean HTML/CSS, no framework overhead",
    },
    {
      label: "Booking",
      value: "One-tap",
      detail: "Online booking link reachable from every page",
    },
    {
      label: "Image format",
      value: "WebP",
      detail: "All gallery and shop photography optimized",
    },
  ],
};

export function getResultsForSlug(slug: string): CaseStudyResult[] {
  return caseStudyResults[slug] ?? [];
}

/** Results that are hard metrics (not pending measurement). */
export function getHardResultsForSlug(slug: string): CaseStudyResult[] {
  return getResultsForSlug(slug).filter((r) => !r.pending);
}
