import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { notifications } from "@/db/schema";

export async function markNotificationAsRead(
  notificationId: string,
  recipientId: string,
) {
  const [notification] = await db
    .update(notifications)
    .set({
      readAt: new Date(),
    })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.recipientId, recipientId),
      ),
    )
    .returning({
      id: notifications.id,
    });

  return notification ?? null;
}