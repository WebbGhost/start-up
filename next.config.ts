import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["localhost"],
	},
	output: "standalone",
};

export default nextConfig;