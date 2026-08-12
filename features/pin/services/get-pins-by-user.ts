import { and, desc, eq, lt } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import type {
  GetUserPinsOptions,
  GetUserPinsResult,
} from "../types/get-pins-by-user";

export async function getUserPinsService({
  userId,
  limit = 24,
  cursor,
}: GetUserPinsOptions): Promise<GetUserPinsResult> {
  const conditions = [
    eq(pins.authorId, userId),
  ];

  if (cursor) {
    const cursorPin = await db.query.pins.findFirst({
      where: eq(pins.id, cursor),
      columns: {
        createdAt: true,
      },
    });

    if (cursorPin) {
      conditions.push(
        lt(pins.createdAt, cursorPin.createdAt),
      );
    }
  }

  const userPins = await db.query.pins.findMany({
    where: and(...conditions),
    orderBy: desc(pins.createdAt),
    limit: limit + 1,
  });

  const hasMore = userPins.length > limit;

  const pagePins = hasMore
    ? userPins.slice(0, limit)
    : userPins;

  const nextCursor = hasMore
    ? pagePins[pagePins.length - 1]?.id ?? null
    : null;

  return {
    pins: pagePins.map((pin) => ({
      id: pin.id,
      title: pin.title,
      imageUrl: pin.imageUrl,
      altText: pin.altText,
      imageWidth: pin.imageWidth,
      imageHeight: pin.imageHeight,
      destinationUrl: null,
    })),
    nextCursor,
  };
}