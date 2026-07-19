import { FeedClient } from "@/components/feed/feed-client";
import { getFeedPosts } from "@/lib/db/queries/posts";
import { syncUser } from "@/lib/auth/sync-user";

export default async function FeedPage() {
  await syncUser();

  const {
    posts,
    hasMore,
    nextCursor,
  } = await getFeedPosts();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover ideas shared by the community.
        </p>
      </div>

      <FeedClient
        initialPins={posts}
        initialHasMore={hasMore}
        initialCursor={nextCursor}
      />
    </main>
  );
}