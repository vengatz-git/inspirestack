"use server";

import { auth } from "@/auth";

import { markNotificationAsRead as markNotificationAsReadService } from "../services/mark-notification-as-read";

export async function markNotificationAsRead(
  notificationId: string,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const notification =
    await markNotificationAsReadService(
      notificationId,
      session.user.id,
    );

  if (!notification) {
    return {
      success: false,
      error: "Notification not found.",
    };
  }

  return {
    success: true,
  };
}