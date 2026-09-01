import { db } from "@/db";
import { drafts } from "@/db/schema";

type CreateDraftServiceInput = {
  authorId: string;
  imageUrl: string;
  imagePublicId: string;
  imageWidth: number;
  imageHeight: number;
  title?: string;
  description?: string;
  topicId?: string | null;
  tagNames?: string[];
};

export async function createDraftService(
  input: CreateDraftServiceInput,
) {
  const tagNames = [
    ...new Set(
      (input.tagNames ?? [])
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  ].slice(0, 10);

  const [draft] = await db
    .insert(drafts)
    .values({
      authorId: input.authorId,
      imageUrl: input.imageUrl,
      imagePublicId: input.imagePublicId,
      imageWidth: input.imageWidth,
      imageHeight: input.imageHeight,
      title: input.title?.trim() || null,
      description: input.description?.trim() || null,
      topicId: input.topicId || null,
      tagNames,
    })
    .returning();

  if (!draft) {
    throw new Error("Failed to create draft.");
  }

  return draft;
}