import { and, desc, eq, gt, lt, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards, pins, users } from "@/db/schema";

import type { ProfilePinCardData } from "../types/profile-pin-card";
interface GetSavedPinsByUserOptions {
  userId: string;
  includePrivate?: boolean;
  limit?: number;
  cursor?: string;
}

interface GetSavedPinsByUserResult {
  pins: ProfilePinCardData[];
  nextCursor: string | null;
}

export async function getSavedPinsByUserService({
  userId,
  includePrivate = false,
  limit = 24,
  cursor,
}: GetSavedPinsByUserOptions): Promise<GetSavedPinsByUserResult> {
  const visibilityCondition = includePrivate
    ? undefined
    : eq(boards.visibility, "PUBLIC");

  const savedPinsQuery = db
    .select({
      pinId: boardPins.pinId,
      savedAt: sql<Date>`max(${boardPins.createdAt})`.as("saved_at"),
    })
    .from(boardPins)
    .innerJoin(boards, eq(boardPins.boardId, boards.id))
    .where(
      visibilityCondition
        ? and(eq(boards.ownerId, userId), visibilityCondition)
        : eq(boards.ownerId, userId),
    )
    .groupBy(boardPins.pinId)
    .as("saved_pins");

  let cursorCondition;

  if (cursor) {
    const cursorPin = await db
      .select({
        pinId: savedPinsQuery.pinId,
        savedAt: savedPinsQuery.savedAt,
      })
      .from(savedPinsQuery)
      .where(eq(savedPinsQuery.pinId, cursor))
      .limit(1);

    const cursorRow = cursorPin[0];

    if (cursorRow) {
      cursorCondition = or(
        lt(savedPinsQuery.savedAt, cursorRow.savedAt),
        and(
          eq(savedPinsQuery.savedAt, cursorRow.savedAt),
          lt(savedPinsQuery.pinId, cursorRow.pinId),
        ),
      );
    }
  }

  const conditions = cursorCondition ? cursorCondition : undefined;

  const result = await db
    .select({
      pin: pins,
      author: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        image: users.image,
      },
      savedAt: savedPinsQuery.savedAt,
    })
    .from(savedPinsQuery)
    .innerJoin(pins, eq(savedPinsQuery.pinId, pins.id))
    .innerJoin(users, eq(pins.authorId, users.id));

  const hasMore = result.length > limit;

  const pageResults = hasMore ? result.slice(0, limit) : result;

  const nextCursor = hasMore
    ? (pageResults[pageResults.length - 1]?.pin.id ?? null)
    : null;

  return {
    pins: pageResults.map(({ pin, author }) => ({
      id: pin.id,
      title: pin.title,
      description: pin.description,
      imageUrl: pin.imageUrl,
      imageWidth: pin.imageWidth,
      imageHeight: pin.imageHeight,
      altText: pin.altText,

      author: {
        id: author.id,
        username: author.username,
        displayName: author.displayName,
        image: author.image,
      },

      isOwner: pin.authorId === userId,
      isSaved: true,
    })),
    nextCursor,
  };
}
