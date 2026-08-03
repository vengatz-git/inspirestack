import { HomeFeed } from "@/features/feed/components/home-feed";
import { getFeed } from "@/features/feed/services/get-feed";

export default async function FeedPage() {
  const feed = await getFeed();

  return <HomeFeed feed={feed} />;
}