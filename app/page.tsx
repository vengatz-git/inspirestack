import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
// import { Logo } from "@/components/layout/logo";
// import { ThemeToggle } from "@/components/layout/theme-toggle";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/feed");
  }

  return (
    <main className="flex min-h-screen items-center justify-center gap-8">
      {/* <Logo />
      <ThemeToggle /> */}
      <Hero />
      <Features />
    </main>
  );
}