"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { pins } from "@/db/schema";
import type { ActionResult } from "@/types/action-result";

import { toggleSavedPinSchema } from "../schemas/toggle-saved-pin-schema";
import { toggleSavedPinService } from "../services/toggle-saved-pin";

export async function toggleSavedPinAction(
  data: unknown,
): Promise<ActionResult<{ saved: boolean }>> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = toggleSavedPinSchema.safeParse(data);

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

  if (!pin || pin.visibility !== "PUBLIC") {
    return {
      success: false,
      error: "Pin not found.",
    };
  }

  const result = await toggleSavedPinService(
    session.user.id,
    pinId,
  );

  revalidatePath("/feed");
  revalidatePath("/profile/[username]", "page");
  revalidatePath(`/pin/${pinId}`);

  return {
    success: true,
    data: {
      saved: result.saved,
    },
  };
}