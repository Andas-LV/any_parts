import type { Metadata } from "next";
import { manrope } from "@/assets/fonts";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@components/Loading";
import "./globals.css";

export const metadata: Metadata = {
	title: "Any Parts",
	description: "Any Parts",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/logo.svg" type="image/svg+xml" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<script
					src={process.env.NEXT_CHATBOT_API}
					data-company-id={process.env.NEXT_DATA_COMPANY_ID}
				></script>
			</head>
			<body className={`${manrope.className}`}>
				<Suspense fallback={<Loading />}>
					{children}
					<Toaster />
				</Suspense>
			</body>
		</html>
	);
}
