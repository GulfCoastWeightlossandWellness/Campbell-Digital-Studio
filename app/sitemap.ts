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
    { url: absoluteUrl("/inquire"), lastModified, changeFrequency: "yearly", priority: 0.6 },
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
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.featured)
    .map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...projectRoutes];
}
