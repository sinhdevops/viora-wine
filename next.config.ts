import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
		remotePatterns: [{ protocol: "https", hostname: "**" }],
		formats: ["image/avif", "image/webp"],
	},
};

export default withNextIntl(nextConfig);
