/**
 * Selected Clients data — used by the home-page Selected Clients row, the
 * proof bar, and any "Trusted by" / wordmark display.
 *
 * Rules:
 *   - Never display a business name without `publicConsent: true`.
 *   - When no logo is available, render the name as a text wordmark — that's
 *     the intentional senior-studio look, not a placeholder for missing assets.
 *   - The Selected Clients section auto-hides when fewer than 2 clients have
 *     `publicConsent: true`. Two named clients is the minimum that reads as
 *     "selected" rather than "single reference."
 *   - Proof bar truthful counts: use `getDisplayableClients().length` for total
 *     client count, `getActiveClients().length` for active engagements. Never
 *     hardcode "2 live client builds" — the studio has 7 consented clients and
 *     5 active engagements as of 2026-06.
 *
 * Engagement state:
 *   - `active: true`  → currently shipping work / on retainer (Revitalize,
 *      Air Solutions, Pro 1 Painters, IHE, ACExperts). Counts toward "active engagements."
 *   - `active: false` → shipped and complete, no current retainer (Collective,
 *      Blessed). Counts toward "clients shipped" but not "active engagements."
 */

export type Client = {
  id: string;
  /** Full business name */
  name: string;
  /** Short / display name (used for compact rows) */
  shortName: string;
  /** Sector + market, e.g. "HVAC · Baldwin County, AL" */
  type: string;
  /** Optional path under /public/images/clients/ (SVG preferred) */
  logoUrl?: string;
  /** Live site URL — opens in new tab */
  websiteUrl: string;
  /**
   * Optional secondary URL for clients with both a marketing site and a product
   * (currently only IHE: marketing + dashboard).
   */
  productUrl?: string;
  /** If a featured case study exists, internal-link to it instead of the live site */
  caseStudySlug?: string;
  /** Optional secondary case study slug (for IHE: marketing + dashboard) */
  secondaryCaseStudySlug?: string;
  /** When false, the client is excluded from public renders entirely */
  publicConsent: boolean;
  /** Currently shipping work / on retainer. Used by proof-bar truthful counts. */
  active: boolean;
};

export const clients: Client[] = [
  {
    id: "revitalize",
    name: "Revitalize Medical & Wellness",
    shortName: "Revitalize",
    type: "Medical aesthetics · Georgia",
    websiteUrl: "http://revitalizemedicalclinic.com/",
    caseStudySlug: "revitalize",
    publicConsent: true,
    active: true,
  },
  {
    id: "air-solutions",
    name: "Air Solutions Heating & Cooling",
    shortName: "Air Solutions",
    type: "HVAC · Baldwin County, AL",
    websiteUrl: "https://airsolutionspros.com",
    caseStudySlug: "air-solutions",
    publicConsent: true,
    active: true,
  },
  {
    id: "pro-1-painters",
    name: "Pro 1 Painters",
    shortName: "Pro 1 Painters",
    type: "Painting · Mobile + Baldwin County, AL",
    websiteUrl: "https://pro1painters.com",
    caseStudySlug: "pro-1-painters",
    publicConsent: true,
    active: true,
  },
  {
    id: "interactive-health-education",
    name: "Interactive Health Education",
    shortName: "Interactive Health Education",
    type: "Digital health platform · Marketing + product",
    websiteUrl: "https://www.interactivehealtheducation.com/",
    productUrl: "https://dashboard.interactivehealtheducation.com/",
    caseStudySlug: "ihe-marketing",
    secondaryCaseStudySlug: "ihe-dashboard",
    publicConsent: true,
    active: true,
  },
  {
    id: "acexperts",
    name: "ACExperts251",
    shortName: "ACExperts",
    type: "HVAC · Baldwin County, AL",
    websiteUrl: "https://acexperts251.com",
    caseStudySlug: "acexperts",
    publicConsent: true,
    active: true,
  },
  {
    id: "collective-counseling",
    name: "Collective Counseling",
    shortName: "Collective Counseling",
    type: "Therapy · Daphne, AL",
    websiteUrl: "https://collectivecounselingdaphne.com",
    caseStudySlug: "collective-counseling",
    publicConsent: true,
    active: false,
  },
  {
    id: "blessed-barbershop",
    name: "Blessed Barbershop",
    shortName: "Blessed Barbershop",
    type: "Local service · Daphne, AL",
    websiteUrl: "https://www.blessedbarbershopdaphne.com",
    caseStudySlug: "blessed-barbershop",
    publicConsent: true,
    active: false,
  },
];

/** All clients that have given consent to be displayed publicly. */
export function getDisplayableClients(): Client[] {
  return clients.filter((c) => c.publicConsent);
}

/** Clients currently shipping work / on retainer. Used by the proof bar. */
export function getActiveClients(): Client[] {
  return clients.filter((c) => c.publicConsent && c.active);
}

/** Truthful proof-bar counts — never hardcode the numbers in app/page.tsx. */
export const proofBarCounts = {
  totalClients: () => getDisplayableClients().length,
  activeEngagements: () => getActiveClients().length,
};
