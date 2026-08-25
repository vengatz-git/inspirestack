import { db } from "@/db";
import { comments } from "@/db/schema";

interface CreateCommentInput {
  pinId: string;
  authorId: string;
  content: string;
}

export async function createCommentService({
  pinId,
  authorId,
  content,
}: CreateCommentInput) {
  const [comment] = await db
    .insert(comments)
    .values({
      pinId,
      authorId,
      content,
    })
    .returning();

  return comment;
}