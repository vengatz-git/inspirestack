import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getFeed } from "@/features/feed/services/get-feed";
import { LandingPage } from "@/features/landing/components/landing-page";

export default async function LandingRoute() {
  const session = await auth();

  if (session?.user) {
    redirect(
      session.user.isOnboarded
        ? "/feed"
        : "/onboarding",
    );
  }

  const feed = await getFeed({
    limit: 12,
  });

  return <LandingPage pins={feed.pins} />;
}