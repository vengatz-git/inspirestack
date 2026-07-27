import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center">
      <h1 className="text-3xl font-bold">
        Welcome to InspireStack 👋
      </h1>
    </main>
  );
}