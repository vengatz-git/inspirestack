"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { comments, pins } from "@/db/schema";
import type { ActionResult } from "@/types/action-result";

import { createNotificationService } from "@/features/notification/services/create-notification";

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

  const { pinId, parentId, content } = validated.data;

  let recipientId: string | null = null;
  let notificationType:
    | "COMMENT"
    | "REPLY"
    | null = null;

  if (parentId) {
    const [parentComment] = await db
      .select({
        id: comments.id,
        pinId: comments.pinId,
        parentId: comments.parentId,
        authorId: comments.authorId,
      })
      .from(comments)
      .where(eq(comments.id, parentId))
      .limit(1);

    if (
      !parentComment ||
      parentComment.pinId !== pinId
    ) {
      return {
        success: false,
        error: "Invalid parent comment.",
      };
    }

    if (parentComment.parentId !== null) {
      return {
        success: false,
        error: "Replies can only target top-level comments.",
      };
    }

    recipientId = parentComment.authorId;
    notificationType = "REPLY";
  } else {
    const [pin] = await db
      .select({
        authorId: pins.authorId,
      })
      .from(pins)
      .where(eq(pins.id, pinId))
      .limit(1);

    if (!pin) {
      return {
        success: false,
        error: "Pin not found.",
      };
    }

    recipientId = pin.authorId;
    notificationType = "COMMENT";
  }

  const comment = await createCommentService({
    pinId,
    parentId,
    content,
    authorId: session.user.id,
  });

  if (recipientId && notificationType) {
    await createNotificationService({
      recipientId,
      actorId: session.user.id,
      type: notificationType,
      pinId,
      commentId: comment.id,
    });
  }

  revalidatePath(`/pin/${pinId}`);

  return {
    success: true,
  };
}