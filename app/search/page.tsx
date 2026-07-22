import { EmptyState } from "@/components/feedback/empty-state";
import { FeedClient } from "@/components/pins/feed-client";
import { FeedHeader } from "@/components/pins/feed-header";

import { searchPosts } from "@/lib/db/queries/posts";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const query = q?.trim() ?? "";

  const posts = query
    ? await searchPosts({
        query,
      })
    : [];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <FeedHeader
        title={
          query
            ? `Results for "${query}"`
            : "Search"
        }
        description={
          query
            ? posts.length > 0
              ? `Showing ${posts.length} result${
                  posts.length === 1 ? "" : "s"
                }`
              : `No search results found for "${query}".`
            : "Search by title, description, category, or tags."
        }
      />

      {posts.length > 0 ? (
        <FeedClient
        key={query}
          initialPins={posts}
          initialHasMore={false}
          initialCursor={null}
        />
      ) : (
        <EmptyState
          title={
            query
              ? "No results found"
              : "Start searching"
          }
          description={
            query
              ? `We couldn't find anything matching "${query}". Try another keyword or browse categories.`
              : "Search by title, description, category, or tags to discover inspiring content."
          }
          actionLabel="Explore Categories"
          actionHref="/categories"
        />
      )}
    </main>
  );
}