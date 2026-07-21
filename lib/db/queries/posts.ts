import {
  arrayContains,
  desc,
  eq,
  ilike,
  lt,
  ne,
  or,
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

interface GetPostsByCategoryOptions {
  category: string;
  cursor?: string;
  limit?: number;
}

export async function getPostsByCategory({
  category,
  cursor,
  limit = DEFAULT_LIMIT,
}: GetPostsByCategoryOptions) {
  const parsedLimit = Math.max(1, Math.min(limit, 50));

  const data = await db.query.posts.findMany({
    where: (posts, { and, eq, lt }) =>
      and(
        eq(posts.category, category),
        cursor
          ? lt(posts.createdAt, new Date(cursor))
          : undefined
      ),

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

interface GetPostsByTagOptions {
  tag: string;
  cursor?: string;
  limit?: number;
}

export async function getPostsByTag({
  tag,
  cursor,
  limit = DEFAULT_LIMIT,
}: GetPostsByTagOptions) {
  const parsedLimit = Math.max(1, Math.min(limit, 50));

  const data = await db.query.posts.findMany({
    where: (posts, { and, lt }) =>
      and(
        arrayContains(posts.tags, [tag]),
        cursor
          ? lt(posts.createdAt, new Date(cursor))
          : undefined
      ),

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

interface GetRelatedPinsOptions {
  id: string;
  category: string;
  tags: string[];
}

export async function getRelatedPins({
  id,
  category,
}: GetRelatedPinsOptions) {
  return db.query.posts.findMany({
    where: (posts, { and, eq, ne }) =>
      and(
        ne(posts.id, id),
        eq(posts.category, category)
      ),

    with: {
      profile: true,
    },

    orderBy: desc(posts.createdAt),

    limit: 20,
  });
}

interface SearchPostsOptions {
  query: string;
  limit?: number;
}

export async function searchPosts({
  query,
  limit = DEFAULT_LIMIT,
}: SearchPostsOptions) {
  const parsedLimit = Math.max(
    1,
    Math.min(limit, 50)
  );

  const search = query.trim().toLowerCase();

  if (!search) {
    return [];
  }

  return db.query.posts.findMany({
    where: (posts) =>
      or(
        ilike(posts.title, `%${search}%`),
        ilike(posts.description, `%${search}%`),
        ilike(posts.category, `%${search}%`),
        arrayContains(posts.tags, [search])
      ),

    with: {
      profile: true,
    },

    orderBy: desc(posts.createdAt),

    limit: parsedLimit,
  });
}

interface SearchPostSuggestionsOptions {
  query: string;
  limit?: number;
}

export async function searchPostSuggestions({
  query,
  limit = 5,
}: SearchPostSuggestionsOptions) {
  const parsedLimit = Math.max(1, Math.min(limit, 10));

  const search = query.trim().toLowerCase();

  if (!search) {
    return [];
  }

  return db.query.posts.findMany({
    columns: {
      id: true,
      title: true,
      category: true,
      imageUrl: true,
    },

    where: (posts) =>
      or(
        ilike(posts.title, `%${search}%`),
        ilike(posts.category, `%${search}%`),
        arrayContains(posts.tags, [search])
      ),

    orderBy: desc(posts.createdAt),

    limit: parsedLimit,
  });
}