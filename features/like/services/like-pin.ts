import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { pinLikes } from "@/db/schema";

import { publishPinLikeUpdate } from "../lib/like-events";

export async function likePinService(
  userId: string,
  pinId: string,
) {
  const [like] = await db
    .insert(pinLikes)
    .values({
      userId,
      pinId,
    })
    .onConflictDoNothing({
      target: [
        pinLikes.pinId,
        pinLikes.userId,
      ],
    })
    .returning();

  if (!like) {
    return null;
  }

  const [result] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(pinLikes)
    .where(eq(pinLikes.pinId, pinId));

  const likeCount = Number(result?.count ?? 0);

  await publishPinLikeUpdate({
    type: "updated",
    pinId,
    likeCount,
  });

  return like;
}

export async function unlikePinService(
  userId: string,
  pinId: string,
) {
  const deleted = await db
    .delete(pinLikes)
    .where(
      and(
        eq(pinLikes.userId, userId),
        eq(pinLikes.pinId, pinId),
      ),
    )
    .returning({
      id: pinLikes.id,
    });

  if (deleted.length === 0) {
    return false;
  }

  const [result] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(pinLikes)
    .where(eq(pinLikes.pinId, pinId));

  const likeCount = Number(result?.count ?? 0);

  await publishPinLikeUpdate({
    type: "updated",
    pinId,
    likeCount,
  });

  return true;
}