import type { NextConfig } from "next";
import insightRedirects from "./src/data/insights/redirects.json";
import migrationRedirects from "./src/data/migration-redirects.json";

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  async redirects() {
    const routes = [
      ...insightRedirects,
      ...migrationRedirects,
      {
        source: "/insights/podcast",
        destination: "/inside-the-circle",
        statusCode: 301,
      },
      { source: "/about-jack-skeen", destination: "/about", statusCode: 301 },
      {
        source: "/all-testimonials",
        destination: "/success-stories",
        statusCode: 301,
      },
      { source: "/the-roadmap", destination: "/roadmap", statusCode: 301 },
      {
        source: "/roadmap/how-it-works",
        destination: "/roadmap",
        statusCode: 301,
      },
    ];
    return routes.flatMap((route) => [
      route,
      { ...route, source: `${route.source}/` },
    ]);
  },
};

export default nextConfig;
