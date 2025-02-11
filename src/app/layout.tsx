import type { Metadata } from "next";
import { manrope } from "@/assets//fonts";
import "../styles/globals.css";
import React, {Suspense} from "react";
import { Toaster } from "@/components/ui/toaster"

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
        <Suspense fallback={<div>Загрузка...</div>}>
          <body className={`${manrope.className}`}>
            {children}
            <Toaster />
          </body>
        </Suspense>
    </html>
  );
}
