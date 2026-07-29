"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}

        <Toaster
          richColors
          position="top-right"
          closeButton
          expand
          visibleToasts={4}
          duration={3000}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}