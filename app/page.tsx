import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect(
      session.user.isOnboarded
        ? "/feed"
        : "/onboarding",
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        InspireStack
      </h1>
    </main>
  );
}