"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

import type { PinCardData } from "@/features/pin/types/pin-card";

import { GoogleAuthButton } from "./google-auth-button";

interface LandingPageProps {
  pins: PinCardData[];
}

export function LandingPage({
  pins,
}: LandingPageProps) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            InspireStack
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </Link>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!showAuth ? (
          <motion.section
            key="discover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              x: -80,
              transition: { duration: 0.35 },
            }}
            className="relative min-h-screen"
          >
            <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-xl"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-sm backdrop-blur">
                  <Sparkles className="size-4" />
                  <span>Ideas worth discovering</span>
                </div>

                <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                  Discover what inspires you.
                </h1>

                <p className="mt-6 max-w-lg text-lg text-muted-foreground sm:text-xl">
                  Explore ideas, collect inspiration, and
                  share the things worth remembering.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="/feed"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    Explore
                    <ArrowRight className="size-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowAuth(true)}
                    className="inline-flex h-12 items-center justify-center rounded-xl border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Get started
                  </button>
                </div>
              </motion.div>

              <LandingPins pins={pins} />
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="auth"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.45 }}
            className="relative min-h-screen"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,var(--muted),transparent_38%)]" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-end px-5 py-28 sm:px-8">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="w-full max-w-md"
              >
                <div className="rounded-3xl border bg-background/90 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
                  <button
                    type="button"
                    onClick={() => setShowAuth(false)}
                    className="mb-8 text-sm text-muted-foreground hover:text-foreground"
                  >
                    ← Back
                  </button>

                  <div className="space-y-3">
                    <h2 className="text-3xl font-semibold tracking-tight">
                      Start discovering.
                    </h2>

                    <p className="text-muted-foreground">
                      Join InspireStack and build your
                      personal collection of inspiration.
                    </p>
                  </div>

                  <div className="mt-8">
                    <GoogleAuthButton />
                  </div>

                  <p className="mt-6 text-center text-xs text-muted-foreground">
                    By continuing, you agree to use
                    InspireStack responsibly.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function LandingPins({ pins }: LandingPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="columns-2 gap-3 sm:columns-3"
    >
      {pins.slice(0, 9).map((pin, index) => (
        <motion.div
          key={pin.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 25,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{ duration: 0.45 }}
          className={`mb-3 break-inside-avoid overflow-hidden rounded-2xl ${
            index === 0 ? "sm:mt-10" : ""
          }`}
        >
          <Image
            src={pin.imageUrl}
            alt={pin.altText ?? pin.title ?? "Inspiration"}
            width={pin.imageWidth}
            height={pin.imageHeight}
            sizes="(max-width: 640px) 45vw, 20vw"
            className="h-auto w-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}