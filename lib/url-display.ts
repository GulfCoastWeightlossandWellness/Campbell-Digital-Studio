/**
 * Display helpers for live-site URLs.
 *
 * The studio puts more visual weight on links that point at a real custom
 * domain ("revitalizemedicalclinic.com") than on links that point at a
 * staging URL ("air-solutions-pros.vercel.app"). These helpers centralize
 * the rule so every consumer renders the same way.
 */

const STAGING_HOSTS = [
  ".vercel.app",
  ".netlify.app",
  ".pages.dev",        // Cloudflare Pages
  ".herokuapp.com",
  ".onrender.com",
  ".fly.dev",
  ".railway.app",
];

/**
 * Hostname suitable for display, with the leading "www." stripped.
 * Returns "" when the input is missing or unparseable.
 */
export function displayDomain(url: string | null | undefined): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Returns true when the URL points at a custom domain rather than a
 * platform staging host (vercel.app, netlify.app, pages.dev, etc.).
 *
 * "Real" domains earn a stronger visual treatment in the work index and
 * Selected Clients row.
 */
export function isRealDomain(url: string | null | undefined): boolean {
  const host = displayDomain(url);
  if (!host) return false;
  return !STAGING_HOSTS.some((suffix) => host.endsWith(suffix));
}
