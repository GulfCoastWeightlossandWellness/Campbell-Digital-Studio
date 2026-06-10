import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

/**
 * Live routes only. Routes that 308-redirect (per next.config.ts) are
 * intentionally excluded — submitting redirected URLs in a sitemap signals
 * to crawlers that those URLs are canonical, which they aren't.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/work"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/healthcare"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/local-services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/studio"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/notes"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/inquire"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    // Legal pages are live, indexable, and self-canonical — include them so
    // crawlers don't treat them as orphaned (linked only from the footer).
    { url: absoluteUrl("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  if (siteConfig.calUsername) {
    staticRoutes.push({
      url: absoluteUrl("/call"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Only featured projects render at /work/[slug]; the others 308-redirect to /work.
  // Keep the sitemap aligned with that rule: never submit a URL that redirects.
  // New featured projects (e.g. Pro 1 Painters) appear here automatically the
  // moment they're added to lib/projects.ts with `featured: true`.
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.featured)
    .map((p) => {
      const coverImage = p.coverImage ?? p.screenshots?.[0]?.src;
      return {
        url: absoluteUrl(`/work/${p.slug}`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        // Image sitemap entry — absolute URL to the case-study cover so the
        // hero captures get crawled for Google Images. `images` is supported
        // by MetadataRoute.Sitemap in this Next version (string[] of locs).
        ...(coverImage ? { images: [absoluteUrl(coverImage)] } : {}),
      };
    });

  return [...staticRoutes, ...projectRoutes];
}
