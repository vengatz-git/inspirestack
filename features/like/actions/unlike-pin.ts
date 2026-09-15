"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";
import { deleteNotificationByLike } from "@/features/notification/services/delete-notification-by-like";

import { unlikePinSchema } from "../schemas/like-schema";
import { unlikePinService } from "../services/like-pin";

export async function unlikePinAction(
  data: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = unlikePinSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  const { pinId } = validated.data;

  const unliked = await unlikePinService(
    session.user.id,
    pinId,
  );

  if (unliked) {
    await deleteNotificationByLike(
      session.user.id,
      pinId,
    );
  }

  revalidatePath(`/pin/${pinId}`);

  return {
    success: true,
  };
}