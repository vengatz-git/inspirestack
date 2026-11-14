// features/profile/actions/follow-user.ts
"use server";

import { auth } from "@/auth";
import { publishNotificationEvent } from "@/features/notification/lib/publish-notification-event";
import { createNotificationService } from "@/features/notification/services/create-notification";
import type { ActionResult } from "@/types/action-result";

import { followUserSchema } from "../schemas/follow-user-schema";
import { followUserService } from "../services/follow-user";

export async function followUserAction(
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
    const created = await followUserService(
      session.user.id,
      parsed.data.userId,
    );

    if (created) {
      await createNotificationService({
        recipientId: parsed.data.userId,
        actorId: session.user.id,
        type: "FOLLOW",
      });

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
    console.error("Failed to follow user:", error);
    return { success: false, error: "Unable to follow this profile." };
  }
}