/**
 * Single source of truth for site-wide identity, canonical URL, and contact.
 *
 * Migrating to a custom domain becomes:
 *   1. Set NEXT_PUBLIC_SITE_URL in Vercel env
 *   2. Update siteConfig.email if the address changes
 *   3. Redeploy
 *
 * See docs/DOMAIN_MIGRATION.md for the full migration checklist.
 */

const fallbackUrl = "https://campbell-digital-studio.vercel.app";

export const siteConfig = {
  /** Canonical URL — read by metadataBase, sitemap, robots, OG tags, JSON-LD */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,

  /** Display name used everywhere */
  name: "Campbell Digital Studio",
  shortName: "Campbell Digital",

  /** Studio voice for default <meta name="description"> */
  description:
    "A small studio building modern websites and local-search infrastructure for clinics, wellness practices, and the kind of local businesses that still answer their own phone.",

  /** Founder / principal */
  founder: {
    name: "Peyton Campbell",
    /** Honorific shown in the about section + Person schema */
    credential: "DO",
    /** Free-text role; left vague intentionally so Peyton can tighten later */
    role: "Physician with a development background",
    location: "Daphne, Alabama",
  },

  /** Contact — must match the inquire page mailto */
  email: "hello@peytoncampbell.studio",

  /** Default OG image, relative to /public */
  ogImage: "/images/og/campbell-digital-studio-og-image.png",

  /** External profiles, if any are public */
  social: {
    /** Set NEXT_PUBLIC_GITHUB_USERNAME to render the GitHub footer link */
    github: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? null,
  },

  /**
   * Cal.com username for the /call booking embed.
   * If unset, /call gracefully falls back to a "request a call" CTA pointing at /inquire.
   */
  calUsername: process.env.NEXT_PUBLIC_CAL_USERNAME ?? null,

  /**
   * Plausible analytics domain.
   * If unset, the analytics script is not rendered.
   */
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? null,
} as const;

/** Build an absolute URL from a relative path */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  const rel = path.startsWith("/") ? path : `/${path}`;
  return `${base}${rel}`;
}
