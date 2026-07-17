import { desc, eq, ne } from "drizzle-orm";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema/posts";

export async function getFeedPosts() {
  return db.query.posts.findMany({
    orderBy: desc(posts.createdAt),
  });
}

export async function getPinById(id: string) {
  return db.query.posts.findFirst({
    where: eq(posts.id, id),
  });
}

export async function getRelatedPins(id: string) {
  return db.query.posts.findMany({
    where: ne(posts.id, id),
    orderBy: desc(posts.createdAt),
    limit: 20,
  });
}