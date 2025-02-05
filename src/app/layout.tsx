import type { Metadata } from "next";
import { manrope } from "@/assets//fonts";
import "../styles/globals.css";
import React from "react";

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
      <body className={`${manrope.className}`}>
        {children}
      </body>
    </html>
  );
}
