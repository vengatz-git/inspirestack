import { notFound } from "next/navigation";

import { FeedClient } from "@/components/pins/feed-client";
import { FeedHeader } from "@/components/pins/feed-header";
import { getPostsByCategory } from "@/lib/db/queries/posts";
import { syncUser } from "@/lib/auth/sync-user";
import { CATEGORIES } from "@/constants/categories";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  await syncUser();

  const { category } = await params;

  const decodedCategory = decodeURIComponent(category);

  const validCategory = CATEGORIES.find(
    (item) => item.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (!validCategory) {
    notFound();
  }

  const {
    posts,
    hasMore,
    nextCursor,
  } = await getPostsByCategory({
    category: validCategory,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <FeedHeader
        title={validCategory}
        description={`Browse ${validCategory.toLowerCase()} inspiration.`}
      />

      <FeedClient
        initialPins={posts}
        initialHasMore={hasMore}
        initialCursor={nextCursor}
      />
    </main>
  );
}