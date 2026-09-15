import postgres from "postgres";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { notifications } from "@/db/schema";

const sql = postgres(
  process.env.DATABASE_DIRECT_URL!,
  {
    max: 1,
  },
);

export async function clearNotifications(
  recipientId: string,
) {
  const deleted = await db
    .delete(notifications)
    .where(
      eq(notifications.recipientId, recipientId),
    )
    .returning({
      id: notifications.id,
      recipientId: notifications.recipientId,
    });

  for (const notification of deleted) {
    await sql.notify(
      "inspirestack_notifications",
      JSON.stringify({
        type: "deleted",
        notificationId: notification.id,
        recipientId: notification.recipientId,
      }),
    );
  }

  return deleted;
}