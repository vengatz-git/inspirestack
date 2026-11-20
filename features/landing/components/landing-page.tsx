"use client";

import type { PinCardData } from "@/features/pin/types/pin-card";

import { LandingAuth } from "./landing-auth";
import { LandingHero } from "./landing-hero";
import { LandingFooter } from "./landing-footer";
import { Logo } from "@/components/shared/logo";

interface LandingPageProps {
  pins: PinCardData[];
}

export function LandingPage({ pins }: LandingPageProps) {
  function scrollToAuth() {
    document.getElementById("join")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-background">
      <LandingHeader onLogin={scrollToAuth} />

      <LandingHero pins={pins} onGetStarted={scrollToAuth} />

      <LandingAuth />

      <LandingFooter />
    </main>
  );
}

interface LandingHeaderProps {
  onLogin: () => void;
}

function LandingHeader({ onLogin }: LandingHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:gap-8 sm:px-8">
        <Logo href="#top" />

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a
            href="/feed"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore
          </a>

          <a
            href="/create"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Create
          </a>

          <a
            href="#footer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="/feed"
            className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            Explore
          </a>

          <button
            type="button"
            onClick={onLogin}
            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border px-5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background sm:text-base"
          >
            Log in
          </button>
        </div>
      </div>
    </header>
  );
}
