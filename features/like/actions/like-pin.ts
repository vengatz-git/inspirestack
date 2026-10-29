"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { pins } from "@/db/schema";
import { createNotificationService } from "@/features/notification/services/create-notification";
import type { ActionResult } from "@/types/action-result";

import { likePinSchema } from "../schemas/like-schema";
import { likePinService } from "../services/like-pin";

export async function likePinAction(data: unknown): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized." };
  }

  const validated = likePinSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, error: "Invalid request." };
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
    return { success: false, error: "Pin not found." };
  }

  const like = await likePinService(session.user.id, pinId);

  if (like && pin.authorId !== session.user.id) {
    await createNotificationService({
      recipientId: pin.authorId,
      actorId: session.user.id,
      type: "LIKE",
      pinId,
    });
  }

  revalidatePath(`/pin/${pinId}`);

  return { success: true };
}