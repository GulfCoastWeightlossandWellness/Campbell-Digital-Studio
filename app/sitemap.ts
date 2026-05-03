import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://peytoncampbell.studio";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/method`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/practice`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/studio`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/notes`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/notes/why-not-wordpress`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/review`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/inquire`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes];
}
