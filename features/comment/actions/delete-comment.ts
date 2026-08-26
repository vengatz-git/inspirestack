"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { deleteCommentSchema } from "../schemas/delete-comment-schema";
import { deleteCommentService } from "../services/delete-comment";

export async function deleteCommentAction(
  commentId: string,
  pinId: string,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const parsed = deleteCommentSchema.safeParse({
    commentId,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid comment.",
    };
  }

  try {
    await deleteCommentService(
      session.user.id,
      parsed.data.commentId,
    );

    revalidatePath(`/pin/${pinId}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to delete comment.",
    };
  }
}