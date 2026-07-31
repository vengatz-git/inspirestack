import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { HomeFeed } from "@/features/feed/components/home-feed";
import { getFeed } from "@/features/feed/services/get-feed";

export default async function FeedPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.isOnboarded) {
    redirect("/onboarding");
  }

  const feed = await getFeed();

  return <HomeFeed feed={feed} />;
}
