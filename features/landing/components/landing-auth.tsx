"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { GoogleAuthButton } from "./google-auth-button";

interface LandingAuthProps {
  standalone?: boolean;
}

export function LandingAuth({ standalone = false }: LandingAuthProps) {
  return (
    <section
      id={standalone ? undefined : "join"}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/landing/auth-background.png')",
          }}
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/30 to-black/65" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-end px-5 py-20 sm:px-8 lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          animate={
            standalone
              ? {
                  opacity: 1,
                  x: 0,
                }
              : undefined
          }
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="w-full max-w-md"
        >
          <div className="bg-background/95 rounded-3xl border border-white/15 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
                <Sparkles className="size-4" />

                <span>
                  {standalone ? "Welcome back" : "Start your collection"}
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {standalone
                  ? "Continue discovering."
                  : "Make inspiration yours."}
              </h2>

              <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-6 sm:text-base">
                {standalone
                  ? "Sign in to your InspireStack account and keep exploring your collection."
                  : "Join InspireStack to save ideas, build boards, and discover more of what you love."}
              </p>
            </div>

            <div className="mt-8">
              <GoogleAuthButton />
            </div>

            <p className="text-muted-foreground mt-6 text-center text-xs leading-5">
              By continuing, you agree to use InspireStack responsibly.
            </p>

            <a
              href="/"
              className="text-muted-foreground hover:text-foreground mt-7 block text-center text-sm font-medium transition-colors"
            >
              ← Back to InspireStack
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
