"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/db";
import { pins } from "@/db/schema";
import type { ActionResult } from "@/types/action-result";
import { deleteNotificationByLike } from "@/features/notification/services/delete-notification-by-like";

import { unlikePinSchema } from "../schemas/like-schema";
import { unlikePinService } from "../services/like-pin";

export async function unlikePinAction(
  data: unknown,
): Promise<ActionResult<{ isLiked: false; likeCount: number }>> {
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

  const [pin] = await db
    .select({
      authorId: pins.authorId,
      visibility: pins.visibility,
    })
    .from(pins)
    .where(eq(pins.id, pinId))
    .limit(1);

  if (
    !pin ||
    (pin.visibility === "PRIVATE" &&
      pin.authorId !== session.user.id)
  ) {
    return {
      success: false,
      error: "Pin not found.",
    };
  }

  const unliked = await unlikePinService(
    session.user.id,
    pinId,
  );

  if (unliked.deleted) {
    try {
      await deleteNotificationByLike(
        session.user.id,
        pinId,
      );
    } catch (error) {
      console.error("Failed to remove like notification:", error);
    }
  }

  revalidatePath(`/pin/${pinId}`);

  return {
    success: true,
    data: { isLiked: false, likeCount: unliked.likeCount },
  };
}