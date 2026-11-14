"use server";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { followUserSchema } from "../schemas/follow-user-schema";
import { unfollowUserService } from "../services/follow-user";

export async function unfollowUserAction(
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
    await unfollowUserService(session.user.id, parsed.data.userId);
    return { success: true };
  } catch (error) {
    console.error("Failed to unfollow user:", error);
    return { success: false, error: "Unable to unfollow this profile." };
  }
}