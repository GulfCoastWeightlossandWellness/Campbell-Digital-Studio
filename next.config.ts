import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy routes collapsed into the long-scroll home or removed entirely.
    return [
      // Canonical host: always redirect apex -> www
      {
        source: "/:path*",
        has: [{ type: "host", value: "campbelldigitalstudio.com" }],
        destination: "https://www.campbelldigitalstudio.com/:path*",
        permanent: true,
      },
      // Legacy About/Capabilities/Process anchors collapsed into /studio in the
      // 2026-05-22 IA refactor. /studio and /notes are now real routes, so the
      // earlier redirects that pointed them at the homepage are removed.
      { source: "/about", destination: "/studio", permanent: true },
      { source: "/services", destination: "/studio#capabilities", permanent: true },
      { source: "/practice", destination: "/studio#capabilities", permanent: true },
      { source: "/method", destination: "/studio#process", permanent: true },
      { source: "/contact", destination: "/inquire", permanent: true },
      { source: "/review", destination: "/inquire", permanent: true },
      { source: "/website-review", destination: "/inquire", permanent: true },
      { source: "/work/interactive-health-education", destination: "/work", permanent: true },
      { source: "/work/acexperts", destination: "/work", permanent: true },
      { source: "/work/collective-counseling", destination: "/work", permanent: true },
      { source: "/work/blessed-barbershop", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
