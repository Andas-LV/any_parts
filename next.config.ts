import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
		NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
	},
};

export default nextConfig;
