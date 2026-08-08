"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { updateBoardSchema } from "../schemas/update-board-schema";
import { updateBoardService } from "../services/update-board";

export async function updateBoardAction(
  data: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = updateBoardSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  try {
    await updateBoardService(
      session.user.id,
      validated.data,
    );

    revalidatePath(`/board/${validated.data.boardId}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Unable to update board.",
    };
  }
}