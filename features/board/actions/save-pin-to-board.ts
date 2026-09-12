"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { pins } from "@/db/schema";
import type { ActionResult } from "@/types/action-result";

import { createNotificationService } from "@/features/notification/services/create-notification";

import { savePinSchema } from "../schemas/save-pin-schema";
import { savePinToBoardService } from "../services/save-pin-to-board";

export async function savePinToBoardAction(
  data: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = savePinSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  const { pinId } = validated.data;

  const pin = await db
    .select({
      authorId: pins.authorId,
    })
    .from(pins)
    .where(eq(pins.id, pinId))
    .limit(1);

  const pinAuthor = pin[0];

  if (!pinAuthor) {
    return {
      success: false,
      error: "Pin not found.",
    };
  }

  const result = await savePinToBoardService(
    validated.data,
  );

  if (result.isNew) {
    await createNotificationService({
      recipientId: pinAuthor.authorId,
      actorId: session.user.id,
      type: "SAVE",
      pinId,
    });
  }

  revalidatePath(`/pin/${pinId}`);

  return {
    success: true,
  };
}