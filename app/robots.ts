import type { MetadataRoute } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

/**
 * Open crawl policy — every route is indexable. The only non-public surface is
 * /api/*, which returns no HTML and carries nothing to index; we disallow it so
 * crawlers don't waste crawl budget probing it.
 *
 * `host` names the canonical host (www). Combined with the apex→www 308 in
 * next.config.ts and per-page canonicals, it removes any www-vs-apex ambiguity
 * that would otherwise split indexing signals.
 */
export default function robots(): MetadataRoute.Robots {
  const canonicalHost = new URL(siteConfig.url).host;

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: canonicalHost,
  };
}
