import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
		NEXT_PUBLIC_LEAFLET_URL: process.env.NEXT_PUBLIC_LEAFLET_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	},
};

export default nextConfig;
