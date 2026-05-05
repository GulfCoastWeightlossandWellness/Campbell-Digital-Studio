/**
 * Selected Clients data — used by the home-page Selected Clients row and
 * any "Trusted by" / wordmark display.
 *
 * Rules:
 *   - Never display a business name without `publicConsent: true`.
 *   - When no logo is available, render the name as a text wordmark — that's
 *     the intentional senior-studio look, not a placeholder for missing assets.
 *   - The Selected Clients section auto-hides when fewer than 2 clients have
 *     `publicConsent: true`. Two named clients is the minimum that reads as
 *     "selected" rather than "single reference."
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
  /** If a featured case study exists, internal-link to it instead of the live site */
  caseStudySlug?: string;
  /** When false, the client is excluded from public renders entirely */
  publicConsent: boolean;
};

export const clients: Client[] = [
  {
    id: "revitalize",
    name: "Revitalize Aesthetics & Wellness",
    shortName: "Revitalize",
    type: "Medical aesthetics · Georgia",
    websiteUrl: "https://revitalize-medical-wellness-clinic-nine.vercel.app",
    caseStudySlug: "revitalize",
    publicConsent: true,
  },
  {
    id: "air-solutions",
    name: "Air Solutions Heating & Cooling",
    shortName: "Air Solutions",
    type: "HVAC · Baldwin County, AL",
    websiteUrl: "https://airsolutionspros.com",
    caseStudySlug: "air-solutions",
    publicConsent: true,
  },
  {
    id: "acexperts",
    name: "ACExperts251",
    shortName: "ACExperts",
    type: "HVAC · Baldwin County, AL",
    websiteUrl: "https://acexperts251.com",
    publicConsent: true,
  },
  {
    id: "collective-counseling",
    name: "Collective Counseling",
    shortName: "Collective Counseling",
    type: "Therapy · Daphne, AL",
    websiteUrl: "https://collectivecounselingdaphne.com",
    publicConsent: true,
  },
  {
    id: "blessed-barbershop",
    name: "Blessed Barbershop",
    shortName: "Blessed Barbershop",
    type: "Local service · Daphne, AL",
    websiteUrl: "https://www.blessedbarbershopdaphne.com",
    publicConsent: true,
  },
];

export function getDisplayableClients(): Client[] {
  return clients.filter((c) => c.publicConsent);
}
