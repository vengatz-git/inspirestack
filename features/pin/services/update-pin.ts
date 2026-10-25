import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { pinTags, pins, tags } from "@/db/schema";

import type { UpdatePinInput } from "../schemas/update-pin-schema";

type UpdatePinServiceInput = UpdatePinInput & {
  userId: string;
};

export async function updatePinService({
  userId,
  pinId,
  title,
  description,
  destinationUrl,
  topicId,
  visibility,
  tags: inputTags,
}: UpdatePinServiceInput) {
  return db.transaction(async (tx) => {
    const [pin] = await tx
      .update(pins)
      .set({
        title: title || null,
        description: description || null,
        destinationUrl: destinationUrl || null,
        topicId,
        visibility,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(pins.id, pinId),
          eq(pins.authorId, userId),
        ),
      )
      .returning({ id: pins.id });

    if (!pin) {
      throw new Error("Pin not found.");
    }

    await tx.delete(pinTags).where(eq(pinTags.pinId, pinId));

    const tagNames = [
      ...new Set(
        inputTags
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
          .values({ name })
          .returning({ id: tags.id });

        tagId = createdTag?.id;
      }

      if (tagId) {
        await tx.insert(pinTags).values({
          pinId,
          tagId,
        });
      }
    }

    return pin;
  });
}