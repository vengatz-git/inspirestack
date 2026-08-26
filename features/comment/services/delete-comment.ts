import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { comments } from "@/db/schema";

export async function deleteCommentService(
  userId: string,
  commentId: string,
) {
  const [comment] = await db
    .select({
      id: comments.id,
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

  await db
    .delete(comments)
    .where(eq(comments.id, commentId));

  return true;
}