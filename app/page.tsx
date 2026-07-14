import { Logo } from "@/components/layout/logo";
import { Hero } from "@/components/landing/hero";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Features } from "@/components/landing/features";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-8">
      {/* <Logo />
      <ThemeToggle /> */}
      <Hero />
      <Features />
    </main>
  );
}