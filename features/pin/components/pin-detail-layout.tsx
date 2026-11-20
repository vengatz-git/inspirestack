import type { ReactNode } from "react";

interface PinDetailLayoutProps {
  children: ReactNode;
}

export function PinDetailLayout({
  children,
}: PinDetailLayoutProps) {
  return (
    <main className="mx-auto max-w-screen-2xl px-0 pt-0 sm:px-6">
      <div className="flex justify-center">
        {children}
      </div>
    </main>
  );
}
