"use server";

import { auth } from "@/auth";

import { getNotifications as getNotificationsService } from "../services/get-notifications";

export async function getNotifications() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  return getNotificationsService(session.user.id);
}