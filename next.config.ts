import MillionLint from "@million/lint";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["localhost"],
	},
	output: "standalone",
};

export default MillionLint.next({
	enabled: true,
	rsc: true,
})(nextConfig);
