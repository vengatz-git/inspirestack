"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { muteUserSchema } from "../schemas/mute-user-schema";
import { setUserMutedService } from "../services/mute-user";

export async function setUserMuteAction(input: unknown): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized." };
  }

  const parsed = muteUserSchema.safeParse(input);

  if (!parsed.success || parsed.data.userId === session.user.id) {
    return { success: false, error: "Invalid mute request." };
  }

  try {
    await setUserMutedService(
      session.user.id,
      parsed.data.userId,
      parsed.data.muted,
    );
    revalidatePath("/feed");

    return { success: true };
  } catch (error) {
    console.error("Failed to update muted user:", error);
    return { success: false, error: "Unable to update feed preferences." };
  }
}
