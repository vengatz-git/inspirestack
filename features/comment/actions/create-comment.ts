"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import type { ActionResult } from "@/types/action-result";

import { createCommentSchema } from "../schemas/create-comment-schema";
import { createCommentService } from "../services/create-comment";

export async function createCommentAction(
  data: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = createCommentSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid comment.",
    };
  }

  await createCommentService({
    ...validated.data,
    authorId: session.user.id,
  });

  revalidatePath(`/pin/${validated.data.pinId}`);

  return {
    success: true,
  };
}