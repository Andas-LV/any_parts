import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
		NEXT_PUBLIC_LEAFLET_URL: process.env.NEXT_PUBLIC_LEAFLET_URL,
		NEXT_CHATBOT_API: process.env.NEXT_CHATBOT_API,
		NEXT_DATA_COMPANY_ID: process.env.NEXT_DATA_COMPANY_ID,
	},
};

export default nextConfig;
