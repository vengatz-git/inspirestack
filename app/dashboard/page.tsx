import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome to InspireStack
      </h1>
    </main>
  );
}