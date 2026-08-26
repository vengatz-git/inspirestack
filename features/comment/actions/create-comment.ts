"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { comments } from "@/db/schema";
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

  if (validated.data.parentId) {
    const [parentComment] = await db
      .select({
        id: comments.id,
        pinId: comments.pinId,
      })
      .from(comments)
      .where(
        and(
          eq(comments.id, validated.data.parentId),
          eq(comments.pinId, validated.data.pinId),
        ),
      )
      .limit(1);

    if (!parentComment) {
      return {
        success: false,
        error: "Invalid parent comment.",
      };
    }
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