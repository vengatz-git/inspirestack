"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import {
  userSettingsSchema,
  type UserSettings,
} from "../schemas/user-settings-schema";
import { updateUserSettingsService } from "../services/update-user-settings";

export async function updateUserSettingsAction(
  data: UserSettings,
): Promise<ActionResult<void, keyof UserSettings>> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = userSettingsSchema.safeParse(data);

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;

    return {
      success: false,
      error: "Please review your settings and try again.",
      fieldErrors: {
        showInSearch: fieldErrors.showInSearch?.[0],
        allowSearchEngineIndexing:
          fieldErrors.allowSearchEngineIndexing?.[0],
        notifyComments: fieldErrors.notifyComments?.[0],
        notifyReplies: fieldErrors.notifyReplies?.[0],
        notifySaves: fieldErrors.notifySaves?.[0],
        notifyLikes: fieldErrors.notifyLikes?.[0],
        notifyFollows: fieldErrors.notifyFollows?.[0],
        defaultPinVisibility: fieldErrors.defaultPinVisibility?.[0],
        defaultBoardVisibility: fieldErrors.defaultBoardVisibility?.[0],
      },
    };
  }

  await updateUserSettingsService(session.user.id, validated.data);
  revalidatePath("/", "layout");

  return { success: true };
}