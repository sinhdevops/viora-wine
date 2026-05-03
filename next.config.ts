import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
		remotePatterns: [{ protocol: "https", hostname: "**" }],
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 768, 1024, 1280, 1920],
	},
};

export default withNextIntl(nextConfig);
