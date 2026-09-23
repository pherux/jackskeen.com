import type { NextConfig } from "next";
import insightRedirects from "./src/data/insights/redirects.json";

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  async redirects() {
    const routes = [
      ...insightRedirects,
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
        permanent: true,
      },
    ];
    return routes.flatMap((route) => [
      route,
      { ...route, source: `${route.source}/` },
    ]);
  },
};

export default nextConfig;
