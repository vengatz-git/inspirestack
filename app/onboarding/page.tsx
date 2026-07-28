import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { OnboardingForm } from "../../features/onboarding/components/onboarding-form";

export default async function OnboardingPage() {
  const session = await auth();

  // const session = await auth();

  console.log(session?.user);

  if (!session) {
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to InspireStack
          </h1>

          <p className="text-muted-foreground">
            Let's create your profile to get started.
          </p>
        </div>

        <div className="bg-card rounded-xl border p-8 shadow-sm">
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}
