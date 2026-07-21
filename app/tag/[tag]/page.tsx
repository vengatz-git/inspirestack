import { FeedClient } from "@/components/pins/feed-client";
import { FeedHeader } from "@/components/pins/feed-header";

import { syncUser } from "@/lib/auth/sync-user";
import { getPostsByTag } from "@/lib/db/queries/posts";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({
  params,
}: TagPageProps) {
  await syncUser();

  const { tag } = await params;

  const decodedTag = decodeURIComponent(tag).toLowerCase();

  const {
    posts,
    hasMore,
    nextCursor,
  } = await getPostsByTag({
    tag: decodedTag,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <FeedHeader
        title={`#${decodedTag}`}
        description={`Browse posts tagged with #${decodedTag}.`}
      />

      <FeedClient
        initialPins={posts}
        initialHasMore={hasMore}
        initialCursor={nextCursor}
      />
    </main>
  );
}