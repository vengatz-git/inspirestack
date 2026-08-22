import { and, desc, eq, lt, ne } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import { mapProfilePinToCard } from "@/features/profile/lib/map-profile-pin-card";

import type {
  GetUserPinsOptions,
  GetUserPinsResult,
} from "../types/get-pins-by-user";

export async function getUserPinsService({
  userId,
  viewerUserId = null,
  limit = 24,
  cursor,
  excludePinId,
}: GetUserPinsOptions): Promise<GetUserPinsResult> {
  const conditions = [
    eq(pins.authorId, userId),
  ];

  /*
   * Pin visibility is independent from board visibility.
   *
   * A PUBLIC pin remains public even when it is saved
   * to a PRIVATE board.
   *
   * Only the pin owner can see their PRIVATE pins.
   */
  if (viewerUserId !== userId) {
    conditions.push(
      eq(pins.visibility, "PUBLIC"),
    );
  }

  if (excludePinId) {
    conditions.push(
      ne(pins.id, excludePinId),
    );
  }

  if (cursor) {
    const cursorPin = await db.query.pins.findFirst({
      where: eq(pins.id, cursor),
      columns: {
        createdAt: true,
      },
    });

    if (cursorPin) {
      conditions.push(
        lt(
          pins.createdAt,
          cursorPin.createdAt,
        ),
      );
    }
  }

  const userPins = await db.query.pins.findMany({
    where: and(...conditions),
    orderBy: desc(pins.createdAt),
    limit: limit + 1,

    with: {
      author: {
        columns: {
          id: true,
          username: true,
          displayName: true,
          image: true,
        },
      },
    },
  });

  const hasMore = userPins.length > limit;

  const pagePins = hasMore
    ? userPins.slice(0, limit)
    : userPins;

  const nextCursor = hasMore
    ? pagePins[pagePins.length - 1]?.id ?? null
    : null;

  return {
    pins: pagePins.map((pin) =>
      mapProfilePinToCard(
        pin,
        viewerUserId,
        false,
      ),
    ),
    nextCursor,
  };
}