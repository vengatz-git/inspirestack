import { desc, lt } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import { mapPinToCard } from "@/features/pin/lib/map-pin-card";
import type {
  FeedResult,
  GetFeedOptions,
} from "../types/feed";

export async function getFeed(
  options?: GetFeedOptions,
): Promise<FeedResult> {
  const limit = options?.limit ?? 30;

  const cursor = options?.cursor
    ? new Date(options.cursor)
    : undefined;

  const feedPins = await db.query.pins.findMany({
    where: cursor
      ? lt(pins.createdAt, cursor)
      : undefined,
    orderBy: desc(pins.createdAt),
    limit: limit + 1,
  });

  const hasMore = feedPins.length > limit;

  const items = hasMore
    ? feedPins.slice(0, limit)
    : feedPins;

  const nextCursor = hasMore
    ? items[items.length - 1].createdAt.toISOString()
    : null;

  return {
    pins: items.map(mapPinToCard),
    nextCursor,
  };
}