import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  comments,
  notifications,
  pins,
  users,
} from "@/db/schema";

export async function getNotifications(
  recipientId: string,
) {
  return db
    .select({
      id: notifications.id,
      type: notifications.type,
      createdAt: notifications.createdAt,
      readAt: notifications.readAt,

      actorId: users.id,
      actorUsername: users.username,
      actorDisplayName: users.displayName,
      actorImage: users.image,

      pinId: pins.id,
      pinTitle: pins.title,
      pinImageUrl: pins.imageUrl,

      commentId: comments.id,
      commentContent: comments.content,
    })
    .from(notifications)
    .innerJoin(
      users,
      eq(notifications.actorId, users.id),
    )
    .leftJoin(
      pins,
      eq(notifications.pinId, pins.id),
    )
    .leftJoin(
      comments,
      eq(notifications.commentId, comments.id),
    )
    .where(eq(notifications.recipientId, recipientId))
    .orderBy(desc(notifications.createdAt))
    .limit(50);
}