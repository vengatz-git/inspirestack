// 

import { eq, isNull, and } from "drizzle-orm";

import { db } from "@/db";
import { notifications } from "@/db/schema";

export async function markAllNotificationsAsRead(
  recipientId: string,
) {
  await db
    .update(notifications)
    .set({
      readAt: new Date(),
    })
    .where(
      and(
        eq(notifications.recipientId, recipientId),
        isNull(notifications.readAt),
      ),
    );
}