import { getFeedPosts } from "@/lib/db/queries/posts";
import { PinCard } from "@/components/feed/pin-card";

export default async function FeedPage() {
  const posts = await getFeedPosts();

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
            <PinCard
                key={post.id}
                pin={post}
            />
            ))}
        </div>
    </main>
  );
}