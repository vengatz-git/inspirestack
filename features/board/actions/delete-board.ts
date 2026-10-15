"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { deleteBoardSchema } from "../schemas/delete-board-schema";
import { deleteBoardService } from "../services/delete-board";

export async function deleteBoardAction(
  boardId: string,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const parsed = deleteBoardSchema.safeParse({
    boardId,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid board.",
    };
  }

  try {
    await deleteBoardService(
      session.user.id,
      parsed.data.boardId,
    );

    if (session.user.username) {
      revalidatePath(
        `/profile/${session.user.username}`,
      );
    }

    revalidatePath("/feed");
    revalidatePath(`/board/${parsed.data.boardId}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to delete board.",
    };
  }
}