import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/studio", permanent: true },
      { source: "/services", destination: "/practice", permanent: true },
      { source: "/contact", destination: "/inquire", permanent: true },
      { source: "/website-review", destination: "/review", permanent: true },
    ];
  },
};

export default nextConfig;
