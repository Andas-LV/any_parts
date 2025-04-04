import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
		NEXT_PUBLIC_LEAFLET_URL: process.env.NEXT_PUBLIC_LEAFLET_URL,
	},
};

export default nextConfig;
