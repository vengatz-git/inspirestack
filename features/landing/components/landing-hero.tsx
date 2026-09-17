"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

import type { PinCardData } from "@/features/pin/types/pin-card";

import { LandingPins } from "./landing-pins";

interface LandingHeroProps {
  pins: PinCardData[];
  onGetStarted: () => void;
}

export function LandingHero({
  pins,
  onGetStarted,
}: LandingHeroProps) {
  return (
    <section className="relative min-h-screen">
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-start gap-10 px-5 pb-16 pt-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-10 pt-[18vh] lg:pt-[24vh]"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-sm backdrop-blur">
            <Sparkles className="size-4" />
            <span>Ideas worth discovering</span>
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Discover what inspires you.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Explore ideas, collect inspiration, and share
            the things worth remembering.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="/feed"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Explore
              <ArrowDown className="size-4 rotate-[-90deg]" />
            </a>

            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex h-12 items-center justify-center rounded-xl border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Get started
            </button>
          </div>
        </motion.div>

        <LandingPins pins={pins} />
      </div>
    </section>
  );
}