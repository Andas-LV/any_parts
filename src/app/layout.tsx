import type { Metadata } from "next";
import { manrope } from "@/assets//fonts";
import "../styles/globals.css";
import React, {Suspense} from "react";
import { Toaster } from "@/components/ui/toaster"
import Loading from "@components/Loading"

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
          <Suspense fallback={<Loading/>}>
            {children}
            <Toaster />
          </Suspense>
       </body>
    </html>
  );
}
