"use server";

import { auth } from "@/auth";

import { getUnreadNotificationCount as getUnreadCountService } from "../services/get-unread-notification-count";

export async function getUnreadNotificationCount() {
  const session = await auth();

  if (!session?.user?.id) {
    return 0;
  }

  return getUnreadCountService(session.user.id);
}