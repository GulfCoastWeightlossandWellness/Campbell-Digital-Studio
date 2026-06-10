import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Web App Manifest. Next serves the metadata icons at /icon.png and
 * /apple-icon.png (from app/icon.png + app/apple-icon.png), and the classic
 * /favicon.ico from public/. Colors come from the studio palette in
 * globals.css: navy ink #14182A (theme) on cream canvas #FAF6EC (background).
 *
 * `display: "browser"` — this is a content/marketing site, not an installable
 * app; we don't want a standalone PWA chrome. The manifest exists for correct
 * icon + theme metadata and clean "add to home screen" behavior.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    theme_color: "#14182A",
    background_color: "#FAF6EC",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  };
}
