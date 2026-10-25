import { eq, inArray, sql } from "drizzle-orm";

import { db } from "@/db";
import { pinLikes } from "@/db/schema";

export interface PinLikeData {
  likeCount: number;
  isLiked: boolean;
}

export async function getPinLikeData(
  pinId: string,
  userId?: string,
) {
  const [result] = await db
    .select({
      likeCount: sql<number>`count(${pinLikes.id})`,
      isLiked: userId
        ? sql<boolean>`
            bool_or(${pinLikes.userId} = ${userId})
          `
        : sql<boolean>`false`,
    })
    .from(pinLikes)
    .where(eq(pinLikes.pinId, pinId));

  return {
    likeCount: Number(result?.likeCount ?? 0),
    isLiked: Boolean(result?.isLiked ?? false),
  };
}

export async function getPinLikeDataForPins(
  pinIds: string[],
  userId?: string | null,
): Promise<Map<string, PinLikeData>> {
  if (pinIds.length === 0) {
    return new Map();
  }

  const rows = await db
    .select({
      pinId: pinLikes.pinId,
      likeCount: sql<number>`count(${pinLikes.id})`,
      isLiked: userId
        ? sql<boolean>`
            bool_or(${pinLikes.userId} = ${userId})
          `
        : sql<boolean>`false`,
    })
    .from(pinLikes)
    .where(inArray(pinLikes.pinId, pinIds))
    .groupBy(pinLikes.pinId);

  return new Map(
    rows.map((row) => [
      row.pinId,
      {
        likeCount: Number(row.likeCount ?? 0),
        isLiked: Boolean(row.isLiked),
      },
    ]),
  );
}