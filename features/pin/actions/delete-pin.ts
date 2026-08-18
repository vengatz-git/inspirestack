"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { deletePinSchema } from "../schemas/delete-pin-schema";
import { deletePinService } from "../services/delete-pin";

export async function deletePinAction(
  pinId: string,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const parsed = deletePinSchema.safeParse({
    pinId,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid pin.",
    };
  }

  try {
    await deletePinService(
      session.user.id,
      parsed.data.pinId,
    );

    if (session.user.username) {
      revalidatePath(`/profile/${session.user.username}`);
    }

    revalidatePath("/feed");
    revalidatePath(`/pin/${parsed.data.pinId}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to delete pin.",
    };
  }
}