import { eq } from "drizzle-orm";

import { db } from "@/db";
import { pinTags, pins, tags } from "@/db/schema";

type CreatePinServiceInput = {
  authorId: string;
  topicId: string;
  title?: string;
  description?: string;
  imageUrl: string;
  imagePublicId: string;
  imageWidth: number;
  imageHeight: number;
  tagNames?: string[];
};

export async function createPinService(
  input: CreatePinServiceInput,
) {
  return db.transaction(async (tx) => {
    const [pin] = await tx
      .insert(pins)
      .values({
        authorId: input.authorId,
        topicId: input.topicId,
        title: input.title || null,
        description: input.description || null,
        imageUrl: input.imageUrl,
        imagePublicId: input.imagePublicId,
        imageWidth: input.imageWidth,
        imageHeight: input.imageHeight,
      })
      .returning();

    if (!pin) {
      throw new Error("Failed to create Pin.");
    }

    const tagNames = [
      ...new Set(
        (input.tagNames ?? [])
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean),
      ),
    ].slice(0, 10);

    for (const name of tagNames) {
      const existingTag = await tx
        .select({ id: tags.id })
        .from(tags)
        .where(eq(tags.name, name))
        .limit(1);

      let tagId = existingTag[0]?.id;

      if (!tagId) {
        const [createdTag] = await tx
          .insert(tags)
          .values({
            name,
          })
          .returning({ id: tags.id });

        tagId = createdTag?.id;
      }

      if (tagId) {
        await tx.insert(pinTags).values({
          pinId: pin.id,
          tagId,
        });
      }
    }

    return pin;
  });
}