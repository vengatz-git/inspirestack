"use server";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { clearNotifications as clearNotificationsService } from "../services/clear-notifications";

export async function clearNotifications(): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  await clearNotificationsService(session.user.id);

  return {
    success: true,
  };
}