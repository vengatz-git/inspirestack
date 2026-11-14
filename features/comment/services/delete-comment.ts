import { and, eq, inArray, or } from "drizzle-orm";

import { db } from "@/db";
import { comments, notifications } from "@/db/schema";

export async function deleteCommentService(
  userId: string,
  commentId: string,
) {
  return db.transaction(async (tx) => {
    const [comment] = await tx
      .select({
        id: comments.id,
        pinId: comments.pinId,
      })
      .from(comments)
      .where(
        and(
          eq(comments.id, commentId),
          eq(comments.authorId, userId),
        ),
      )
      .limit(1);

    if (!comment) {
      throw new Error("Comment not found.");
    }

    const commentIds = await tx
      .select({ id: comments.id })
      .from(comments)
      .where(
        or(
          eq(comments.id, commentId),
          eq(comments.parentId, commentId),
        ),
      );

    const deletedNotifications = await tx
      .delete(notifications)
      .where(
        inArray(
          notifications.commentId,
          commentIds.map(({ id }) => id),
        ),
      )
      .returning({
        id: notifications.id,
        recipientId: notifications.recipientId,
      });

    const [deletedComment] = await tx
      .delete(comments)
      .where(
        and(
          eq(comments.id, commentId),
          eq(comments.authorId, userId),
        ),
      )
      .returning({ id: comments.id });

    if (!deletedComment) {
      throw new Error("Comment not found.");
    }

    return {
      pinId: comment.pinId,
      deletedNotifications,
    };
  });
}