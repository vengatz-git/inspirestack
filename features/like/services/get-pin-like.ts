import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { pinLikes } from "@/db/schema";

export async function getPinLikeStatus(
  userId: string,
  pinId: string,
) {
  const [like] = await db
    .select({
      id: pinLikes.id,
    })
    .from(pinLikes)
    .where(
      and(
        eq(pinLikes.userId, userId),
        eq(pinLikes.pinId, pinId),
      ),
    )
    .limit(1);

  return Boolean(like);
}

export async function getPinLikeCount(
  pinId: string,
) {
  const [result] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(pinLikes)
    .where(eq(pinLikes.pinId, pinId));

  return Number(result?.count ?? 0);
}