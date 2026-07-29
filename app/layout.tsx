import type { Metadata } from "next";
import {
  Geist_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { AppProviders } from "@/components/providers/app-providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InspireStack",
  description: "Visual discovery platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        plusJakartaSans.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}