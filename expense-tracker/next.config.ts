import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/claudecode-project',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
