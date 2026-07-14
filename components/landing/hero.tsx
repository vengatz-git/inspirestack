import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/effects/ambient-background";
// import { HeroShowcase } from "./hero-showcase";

const heroContent = {
  badge: "Modern Visual Discovery Platform",
  title: "Discover ideas that inspire your next creation.",
  description:
    "Explore beautiful visual content, organize inspiration, and showcase your creativity through a fast, elegant, and modern platform.",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AmbientBackground />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-28 lg:pt-32 lg:pb-36">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            {heroContent.badge}
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            {heroContent.title}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            {heroContent.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/explore">
                Explore Ideas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-in">
                Share Your Work
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Showcase */}
        <div className="mt-24">
          {/* <HeroShowcase /> */}
        </div>
      </div>
    </section>
  );
}