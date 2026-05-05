/**
 * Real client testimonials.
 *
 * Rules (from the rebuild brief):
 *   - Never invent quotes, names, or attributions.
 *   - Display gating uses BOTH `permission` (consent state) and `publicConsent`
 *     (whether name + business may appear publicly). When publicConsent is false,
 *     the testimonial renders anonymously (e.g. "HVAC contractor, Baldwin County").
 *   - Sections that wrap testimonials must check `getFeaturedTestimonials()` and
 *     render NOTHING when the array is empty. Never display empty placeholder slots.
 *
 * To add a real testimonial:
 *   1. Get explicit written permission (text/email is fine — keep a copy).
 *   2. Use the verbatim quote — do not paraphrase.
 *   3. Set permission: 'written' and publicConsent: true.
 *   4. Set caseStudySlug if it links to a case study (revitalize | air-solutions).
 */

export type Testimonial = {
  id: string;
  /** Verbatim quote, 1–3 sentences */
  quote: string;
  authorName: string;
  authorTitle: string;
  authorLocation?: string;
  /** Slug of a case study to link from this testimonial */
  caseStudySlug?: string;
  /** Show on home page featured slot */
  featured: boolean;
  /** Consent state — verbal is OK to track but should be confirmed in writing before publishing */
  permission: "verbal" | "written";
  /** When false, render anonymously even if quote is filled in */
  publicConsent: boolean;
  /** Anonymized rendering (used when publicConsent is false) */
  anonymizedAuthor?: string;
};

export const testimonials: Testimonial[] = [
  // Seed entries — quotes intentionally blank until Peyton supplies verbatim text + written permission.
  // Render code automatically excludes any testimonial without a non-empty quote.
  // TODO(peyton): paste Reaves Nelson's verbatim quote, confirm written permission, flip publicConsent to true.
  {
    id: "reaves-nelson-air-solutions",
    quote: "",
    authorName: "Reaves Nelson",
    authorTitle: "Owner, Air Solutions Heating & Cooling",
    authorLocation: "Daphne, AL",
    caseStudySlug: "air-solutions",
    featured: true,
    permission: "verbal",
    publicConsent: false,
    anonymizedAuthor: "HVAC contractor · Baldwin County, AL",
  },
  // TODO(peyton): if Revitalize provides a public testimonial, add it here.
  // The case-study page already has a placeholder block for this — once a real
  // quote and written permission are in place, fill the entry below and remove the placeholder.
  {
    id: "revitalize-principal",
    quote: "",
    authorName: "",
    authorTitle: "Principal, Revitalize Aesthetics & Wellness",
    caseStudySlug: "revitalize",
    featured: true,
    permission: "verbal",
    publicConsent: false,
    anonymizedAuthor: "Multi-location medical aesthetics practice · Georgia",
  },
];

/** Returns testimonials that are safe to display in any form (have a real quote). */
export function getDisplayableTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.quote.trim().length > 0);
}

/** Featured + displayable testimonials, for the home-page section. */
export function getFeaturedTestimonials(): Testimonial[] {
  return getDisplayableTestimonials().filter((t) => t.featured);
}

/** Testimonial(s) for a specific case study slug, if any are displayable. */
export function getTestimonialForSlug(slug: string): Testimonial | undefined {
  return getDisplayableTestimonials().find((t) => t.caseStudySlug === slug);
}

/**
 * Format the attribution line for a testimonial, respecting publicConsent.
 * Returns the full named attribution if consent is given, or the anonymized
 * label if not.
 */
export function formatAttribution(t: Testimonial): string {
  if (t.publicConsent && t.authorName) {
    const loc = t.authorLocation ? ` · ${t.authorLocation}` : "";
    return `${t.authorName}, ${t.authorTitle}${loc}`;
  }
  return t.anonymizedAuthor ?? t.authorTitle;
}
