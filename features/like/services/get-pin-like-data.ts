import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { pinLikes } from "@/db/schema";

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