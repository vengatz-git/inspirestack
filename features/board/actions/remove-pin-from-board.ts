"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { removePinSchema } from "../schemas/remove-pin-schema";
import { removePinFromBoardService } from "../services/remove-pin-from-board";

export async function removePinFromBoardAction(
  data: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = removePinSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  await removePinFromBoardService(session.user.id, validated.data);

  revalidatePath(`/board/${validated.data.boardId}`);

  return {
    success: true,
  };
}
