import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">
        Complete your profile
      </h1>

      <p className="mt-4 text-muted-foreground">
        Let's set up your InspireStack profile.
      </p>
    </main>
  );
}