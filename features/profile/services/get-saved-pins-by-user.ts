import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards, pins } from "@/db/schema";

import { mapPinToCard } from "@/features/pin/lib/map-pin-card";
import type { PinCardData } from "@/features/pin/types/pin-card";

interface GetSavedPinsByUserOptions {
  userId: string;
  includePrivate?: boolean;
}

export async function getSavedPinsByUserService({
  userId,
  includePrivate = false,
}: GetSavedPinsByUserOptions): Promise<PinCardData[]> {
  const visibilityCondition = includePrivate
    ? undefined
    : eq(boards.visibility, "PUBLIC");

  const result = await db
    .select({
      pin: pins,
      savedAt: boardPins.createdAt,
    })
    .from(boardPins)
    .innerJoin(
      boards,
      eq(boardPins.boardId, boards.id),
    )
    .innerJoin(
      pins,
      eq(boardPins.pinId, pins.id),
    )
    .where(
      visibilityCondition
        ? and(
            eq(boards.ownerId, userId),
            visibilityCondition,
          )
        : eq(boards.ownerId, userId),
    )
    .orderBy(desc(boardPins.createdAt));

  const seenPinIds = new Set<string>();

  return result
    .filter(({ pin }) => {
      if (seenPinIds.has(pin.id)) {
        return false;
      }

      seenPinIds.add(pin.id);

      return true;
    })
    .map(({ pin }) => mapPinToCard(pin));
}