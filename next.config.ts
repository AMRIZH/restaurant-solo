import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["yoloverse.pythonanywhere.com"], // Add the external domain here
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
};

export default nextConfig;
