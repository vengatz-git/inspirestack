import postgres from "postgres";

import { db } from "@/db";
import { notifications } from "@/db/schema";

interface CreateNotificationInput {
  recipientId: string;
  actorId: string;
  type: "COMMENT" | "REPLY" | "SAVE" | "LIKE" | "FOLLOW";
  pinId?: string | null;
  commentId?: string | null;
}

const sql = postgres(
  process.env.DATABASE_DIRECT_URL!,
  {
    max: 1,
  },
);

export async function createNotificationService({
  recipientId,
  actorId,
  type,
  pinId,
  commentId,
}: CreateNotificationInput) {
  if (recipientId === actorId) {
    return null;
  }

  try {
    const [notification] = await db
      .insert(notifications)
      .values({
        recipientId,
        actorId,
        type,
        pinId: pinId ?? null,
        commentId: commentId ?? null,
      })
      .returning();

    if (notification) {
      const event = {
        type: "created" as const,
        notificationId: notification.id,
        recipientId: notification.recipientId,
      };

      try {
        await sql.notify(
          "inspirestack_notifications",
          JSON.stringify(event),
        );
      } catch (error) {
        console.error("Failed to publish notification:", error);
      }
    }

    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    return null;
  }
}