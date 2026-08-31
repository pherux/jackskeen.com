import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/roadmap/how-it-works",
        destination: "/roadmap",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
