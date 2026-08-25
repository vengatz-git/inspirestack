import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { comments } from "@/db/schema";

import type { CommentData } from "../types/comment";

const COMMENTS_LIMIT = 50;

export async function getCommentsByPinService(
  pinId: string,
): Promise<CommentData[]> {
  const results = await db.query.comments.findMany({
    where: eq(comments.pinId, pinId),

    orderBy: desc(comments.createdAt),

    limit: COMMENTS_LIMIT,

    with: {
      author: {
        columns: {
          id: true,
          username: true,
          displayName: true,
          image: true,
        },
      },
    },
  });

  return results.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,

    author: {
      id: comment.author.id,
      username: comment.author.username,
      displayName: comment.author.displayName,
      image: comment.author.image,
    },
  }));
}