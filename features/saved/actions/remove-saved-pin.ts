"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { removeSavedPinSchema } from "../schemas/remove-saved-pin-schema";
import { removeSavedPinService } from "../services/remove-saved-pin";

export async function removeSavedPinAction(
  data: unknown,
): Promise<ActionResult<{ removed: boolean }>> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = removeSavedPinSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  const removed = await removeSavedPinService(
    session.user.id,
    validated.data.pinId,
  );

  revalidatePath("/feed");
  revalidatePath("/profile/[username]", "page");

  return {
    success: true,
    data: {
      removed,
    },
  };
}