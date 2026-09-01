import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { comments } from "@/db/schema";

import type {
  CommentAuthor,
  CommentData,
} from "../types/comment";

const COMMENTS_LIMIT = 50;

type CommentRow = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;
  author: CommentAuthor;
};

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

  const rows: CommentRow[] = results.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    parentId: comment.parentId,
    author: {
      id: comment.author.id,
      username: comment.author.username,
      displayName: comment.author.displayName,
      image: comment.author.image,
    },
  }));

  const commentsById = new Map<string, CommentData>();

  for (const row of rows) {
    commentsById.set(row.id, {
      id: row.id,
      content: row.content,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      author: row.author,
      replies: [],
    });
  }

  const rootComments: CommentData[] = [];

  for (const row of rows) {
    const comment = commentsById.get(row.id);

    if (!comment) {
      continue;
    }

    if (!row.parentId) {
      rootComments.push(comment);
      continue;
    }

    const parent = commentsById.get(row.parentId);

    if (parent) {
      parent.replies.push(comment);
    }
  }

  sortReplies(rootComments);

  return rootComments;
}

function sortReplies(commentList: CommentData[]) {
  commentList.sort(
    (a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime(),
  );

  for (const comment of commentList) {
    sortReplies(comment.replies);
  }
}