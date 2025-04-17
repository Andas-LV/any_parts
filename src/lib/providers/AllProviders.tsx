"use client";
// import { SessionProvider } from "next-auth/react";
import React from "react";

export const AllProviders = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <>{children}</>;
};
