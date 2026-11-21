import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { AppProviders } from "@/components/providers/app-providers";
import { ServiceWorkerRegister } from "@/components/providers/service-worker-register";
import { Toaster } from "sonner";

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

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? new URL(process.env.NEXT_PUBLIC_APP_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: defaultUrl,
  title: {
    default: "InspireStack",
    template: "%s | InspireStack",
  },
  description: "Visual discovery platform — Save, organize, and share your inspiration.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "InspireStack",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "InspireStack",
    description: "Visual discovery platform — Save, organize, and share your inspiration.",
    url: "/",
    siteName: "InspireStack",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InspireStack",
    description: "Visual discovery platform — Save, organize, and share your inspiration.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(plusJakartaSans.variable, geistMono.variable)}
    >
      <body className="min-h-screen max-w-full overflow-x-clip bg-background font-sans antialiased">
        <AppProviders>{children}</AppProviders>
        <ServiceWorkerRegister />

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
