import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy routes collapsed into the long-scroll home or removed entirely.
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/studio", destination: "/#about", permanent: true },
      { source: "/services", destination: "/#capabilities", permanent: true },
      { source: "/practice", destination: "/#capabilities", permanent: true },
      { source: "/method", destination: "/#process", permanent: true },
      { source: "/notes", destination: "/", permanent: true },
      { source: "/notes/:slug*", destination: "/", permanent: true },
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
