import { db } from "@/db";
import { comments } from "@/db/schema";

interface CreateCommentInput {
  pinId: string;
  authorId: string;
  parentId?: string | null;
  content: string;
}

export async function createCommentService({
  pinId,
  authorId,
  parentId,
  content,
}: CreateCommentInput) {
  const [comment] = await db
    .insert(comments)
    .values({
      pinId,
      authorId,
      parentId: parentId ?? null,
      content,
    })
    .returning();

  return comment;
}