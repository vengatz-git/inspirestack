import { db } from "@/db";
import { pins } from "@/db/schema";

type CreatePinServiceInput = {
  authorId: string;
  title?: string;
  description?: string;
  altText?: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

export async function createPinService(
  input: CreatePinServiceInput,
) {
  const [pin] = await db
    .insert(pins)
    .values({
      authorId: input.authorId,
      title: input.title || null,
      description: input.description || null,
      altText: input.altText || null,
      imageUrl: input.imageUrl,
      imageWidth: input.imageWidth,
      imageHeight: input.imageHeight,
    })
    .returning();

  return pin;
}