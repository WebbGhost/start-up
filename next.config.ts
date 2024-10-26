import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
  },
  output: "standalone",
  // experimental: {
  //   ppr: true,
  // },
  devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: "bottom-right",
    buildActivity: true,
  },
};

export default nextConfig;
