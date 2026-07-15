import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { AuthControls } from "./auth-controls";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6">
        <Logo />

        <NavLinks />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AuthControls />
        </div>
      </div>
    </header>
  );
}