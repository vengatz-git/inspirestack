import postgres from "postgres";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { notifications } from "@/db/schema";

const sql = postgres(
  process.env.DATABASE_DIRECT_URL!,
  {
    max: 1,
  },
);

export async function deleteNotificationByLike(
  actorId: string,
  pinId: string,
) {
  const deleted = await db
    .delete(notifications)
    .where(
      and(
        eq(notifications.actorId, actorId),
        eq(notifications.pinId, pinId),
        eq(notifications.type, "LIKE"),
      ),
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