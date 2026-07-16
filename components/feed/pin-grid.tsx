import type { InferSelectModel } from "drizzle-orm";

import { posts } from "@/lib/db/schema/posts";

import { PinCard } from "./pin-card";

type Post = InferSelectModel<typeof posts>;

interface PinGridProps {
  posts: Post[];
}

export function PinGrid({
  posts,
}: PinGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <PinCard
          key={post.id}
          pin={post}
        />
      ))}
    </div>
  );
}