import { and, eq, isNull, count } from "drizzle-orm";

import { db } from "@/db";
import { notifications } from "@/db/schema";

export async function getUnreadNotificationCount(
  recipientId: string,
) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(notifications)
    .where(
      and(
        eq(notifications.recipientId, recipientId),
        isNull(notifications.readAt),
      ),
    );

  return result?.count ?? 0;
}