// features/notification/lib/publish-notification-event.ts
import postgres from "postgres";

import type { NotificationEvent } from "./notification-events";

const sql = postgres(process.env.DATABASE_DIRECT_URL!, { max: 1 });

export async function publishNotificationEvent(event: NotificationEvent) {
  try {
    await sql.notify(
      "inspirestack_notifications",
      JSON.stringify(event),
    );
  } catch (error) {
    console.error(
      "[Notifications] Failed to publish notification event:",
      error,
    );
  }
}