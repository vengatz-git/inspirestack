// features/profile/actions/unfollow-user.ts
"use server";

import { auth } from "@/auth";
import { publishNotificationEvent } from "@/features/notification/lib/publish-notification-event";
import type { ActionResult } from "@/types/action-result";

import { followUserSchema } from "../schemas/follow-user-schema";
import { unfollowUserService } from "../services/follow-user";

export async function unfollowUserAction(
  input: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized." };
  }

  const parsed = followUserSchema.safeParse(input);

  if (!parsed.success || parsed.data.userId === session.user.id) {
    return { success: false, error: "Invalid follow request." };
  }

  try {
    const result = await unfollowUserService(
      session.user.id,
      parsed.data.userId,
    );

    for (const notification of result.deletedNotifications) {
      await publishNotificationEvent({
        type: "deleted",
        notificationId: notification.id,
        recipientId: notification.recipientId,
      });
    }

    if (result.unfollowed) {
      await Promise.all(
        [session.user.id, parsed.data.userId].map((recipientId) =>
          publishNotificationEvent({
            type: "follow-updated",
            recipientId,
          }),
        ),
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to unfollow user:", error);
    return { success: false, error: "Unable to unfollow this profile." };
  }
}