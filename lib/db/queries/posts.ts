import { desc } from "drizzle-orm";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema/posts";

export async function getFeedPosts() {
  return db.query.posts.findMany({
    orderBy: desc(posts.createdAt),
  });
}