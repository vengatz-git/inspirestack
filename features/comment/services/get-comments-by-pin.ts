import { desc, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { comments } from "@/db/schema";

import type {
  CommentData,
  CommentReplyData,
} from "../types/comment";

const COMMENTS_LIMIT = 50;

export async function getCommentsByPinService(
  pinId: string,
): Promise<CommentData[]> {
  const results = await db.query.comments.findMany({
    where: (comment, { and, eq, isNull }) =>
      and(
        eq(comment.pinId, pinId),
        isNull(comment.parentId),
      ),

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

      replies: {
        orderBy: desc(comments.createdAt),

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

    replies: comment.replies.map(
      (reply): CommentReplyData => ({
        id: reply.id,
        content: reply.content,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,

        author: {
          id: reply.author.id,
          username: reply.author.username,
          displayName: reply.author.displayName,
          image: reply.author.image,
        },
      }),
    ),
  }));
}