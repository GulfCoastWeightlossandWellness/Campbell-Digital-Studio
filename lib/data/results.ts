/**
 * Per-case-study real results.
 *
 * Rules:
 *   - Never invent numbers. Leave the array empty for a slug until real data
 *     is captured (Google Search Console, Local Falcon, GA4, etc.).
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
};

/**
 * Keyed by project slug. Add real entries when measurements are captured.
 *
 * Air Solutions launched recently and the platform's BEFORE state was
 * documented as "0% Share of Local Voice in south Baldwin markets" (per the
 * project brief in lib/projects.ts). Post-launch SoLV / ARP / grid coverage
 * data should land here once Local Falcon snapshots are taken.
 *
 * TODO(peyton): paste post-launch numbers from Local Falcon and GSC into the
 * arrays below. Until then the case-study Results sections render nothing.
 */
export const caseStudyResults: Record<string, CaseStudyResult[]> = {
  "air-solutions": [
    // TODO(peyton): once Local Falcon SoLV + ARP + grid snapshots are taken,
    // populate this array. Example shape:
    // { label: "Local Falcon SoLV (Daphne)", value: "34.69%", detail: "#1 in market" },
    // { label: "Average rank position", value: "6.59", detail: "Top-tier across 49-point grid" },
    // { label: "Grid coverage (5mi)", value: "49 / 49", detail: "Full saturation" },
  ],
  revitalize: [
    // TODO(peyton): post-launch GSC + GA4 metrics for Revitalize.
  ],
};

export function getResultsForSlug(slug: string): CaseStudyResult[] {
  return caseStudyResults[slug] ?? [];
}
