import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { drafts } from "@/db/schema";

type UpdateDraftServiceInput = {
  draftId: string;
  authorId: string;
  title?: string;
  description?: string;
  topicId?: string | null;
  tagNames?: string[];
};

export async function updateDraftService(
  input: UpdateDraftServiceInput,
) {
  const values: {
    title?: string | null;
    description?: string | null;
    topicId?: string | null;
    tagNames?: string[];
  } = {};

  if (input.title !== undefined) {
    values.title = input.title.trim() || null;
  }

  if (input.description !== undefined) {
    values.description =
      input.description.trim() || null;
  }

  if (input.topicId !== undefined) {
    values.topicId = input.topicId || null;
  }

  if (input.tagNames !== undefined) {
    values.tagNames = [
      ...new Set(
        input.tagNames
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean),
      ),
    ].slice(0, 10);
  }

  const [draft] = await db
    .update(drafts)
    .set(values)
    .where(
      and(
        eq(drafts.id, input.draftId),
        eq(drafts.authorId, input.authorId),
      ),
    )
    .returning();

  return draft ?? null;
}