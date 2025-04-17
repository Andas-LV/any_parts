import type { Metadata } from "next";
import { manrope } from "@/assets/fonts";
import React, { Suspense } from "react";
import { AllProviders } from "@/lib/providers/AllProviders";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@components/Loading";
import "./globals.css";

export const metadata: Metadata = {
	title: "Any Parts",
	description: "Any Parts",
	creator: "ZIZ INC.",
	generator: "Next.js",
	icons: {
		icon: "/logo.svg",
		shortcut: "/logo.svg",
		apple: "/logo.svg",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${manrope.className}`}>
				<Suspense fallback={<Loading />}>
					<AllProviders>
						{children}
						<Toaster />
					</AllProviders>
				</Suspense>
			</body>
		</html>
	);
}
