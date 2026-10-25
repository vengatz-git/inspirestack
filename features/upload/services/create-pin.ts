import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  boardPins,
  boards,
  pinTags,
  pins,
  tags,
} from "@/db/schema";

type CreatePinServiceInput = {
  authorId: string;
  topicId: string;
  boardId?: string;
  visibility?: "PUBLIC" | "PRIVATE";
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
        visibility: input.visibility ?? "PUBLIC",
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

    if (input.boardId) {
      const board = await tx.query.boards.findFirst({
        where: and(
          eq(boards.id, input.boardId),
          eq(boards.ownerId, input.authorId),
        ),
        columns: {
          coverPinId: true,
        },
      });

      if (!board) {
        throw new Error("Board not found.");
      }

      await tx.insert(boardPins).values({
        boardId: input.boardId,
        pinId: pin.id,
      });

      await tx
        .update(boards)
        .set({
          lastUsedAt: new Date(),
          ...(board.coverPinId === null && {
            coverPinId: pin.id,
          }),
        })
        .where(eq(boards.id, input.boardId));
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
          .values({ name })
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