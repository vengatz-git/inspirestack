"use client";

import type { PinCardData } from "@/features/pin/types/pin-card";

import { LandingAuth } from "./landing-auth";
import { LandingHero } from "./landing-hero";
import { LandingFooter } from "./landing-footer";

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
    <main id="top" className="bg-background min-h-screen overflow-x-hidden">
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
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-5 sm:px-8">
        <a href="#top" className="shrink-0 text-xl font-bold tracking-tight">
          InspireStack
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a
            href="/feed"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore
          </a>

          <a
            href="/create"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Create
          </a>

          <a
            href="#footer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
        </nav>

        <div className="ml-auto">
          <button
            type="button"
            onClick={onLogin}
            className="hover:bg-foreground hover:text-background inline-flex h-10 items-center justify-center rounded-xl border px-5 text-md font-medium transition-colors"
          >
            Log in
          </button>
        </div>
      </div>
    </header>
  );
}
