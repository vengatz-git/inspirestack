"use server";

import { auth } from "@/auth";

import { markAllNotificationsAsRead as markAllNotificationsAsReadService } from "../services/mark-all-notifications-as-read";

export async function markAllNotificationsAsRead() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  await markAllNotificationsAsReadService(
    session.user.id,
  );

  return {
    success: true,
  };
}