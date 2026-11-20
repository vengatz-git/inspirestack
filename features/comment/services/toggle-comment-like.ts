import { and, count, eq } from "drizzle-orm";

import { db } from "@/db";
import { commentLikes } from "@/db/schema";

interface ToggleCommentLikeInput {
  commentId: string;
  userId: string;
}

export async function toggleCommentLikeService({
  commentId,
  userId,
}: ToggleCommentLikeInput): Promise<{ isLiked: boolean; likeCount: number }> {
  return db.transaction(async (tx) => {
    const existing = await tx.query.commentLikes.findFirst({
      where: and(
        eq(commentLikes.commentId, commentId),
        eq(commentLikes.userId, userId),
      ),
    });

    let isLiked = false;

    if (existing) {
      await tx
        .delete(commentLikes)
        .where(
          and(
            eq(commentLikes.commentId, commentId),
            eq(commentLikes.userId, userId),
          ),
        );
      isLiked = false;
    } else {
      await tx.insert(commentLikes).values({
        commentId,
        userId,
      });
      isLiked = true;
    }

    const [countResult] = await tx
      .select({ count: count() })
      .from(commentLikes)
      .where(eq(commentLikes.commentId, commentId));

    return {
      isLiked,
      likeCount: Number(countResult?.count ?? 0),
    };
  });
}
