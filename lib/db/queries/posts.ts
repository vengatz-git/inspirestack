import {
  desc,
  eq,
  lt,
  ne,
} from "drizzle-orm";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema/posts";

const DEFAULT_LIMIT = 24;

interface GetFeedPostsOptions {
  cursor?: string;
  limit?: number;
}

export async function getFeedPosts({
  cursor,
  limit = DEFAULT_LIMIT,
}: GetFeedPostsOptions = {}) {
  const parsedLimit = Math.max(1, Math.min(limit, 50));

  const data = await db.query.posts.findMany({
    where: cursor
      ? lt(posts.createdAt, new Date(cursor))
      : undefined,

    with: {
      profile: true,
    },

    orderBy: desc(posts.createdAt),

    limit: parsedLimit + 1,
  });

  const hasMore = data.length > parsedLimit;

  const items = hasMore
    ? data.slice(0, parsedLimit)
    : data;

  const nextCursor =
    hasMore && items.length > 0
      ? items[items.length - 1].createdAt.toISOString()
      : null;

  return {
    posts: items,
    hasMore,
    nextCursor,
  };
}

export async function getPinById(id: string) {
  return db.query.posts.findFirst({
    where: eq(posts.id, id),

    with: {
      profile: true,
    },
  });
}

export async function getRelatedPins(id: string) {
  return db.query.posts.findMany({
    where: ne(posts.id, id),

    with: {
      profile: true,
    },

    orderBy: desc(posts.createdAt),

    limit: 20,
  });
}