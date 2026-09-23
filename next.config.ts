import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  reactStrictMode: true,
  async redirects() {
    return [
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
  },
};

export default nextConfig;
