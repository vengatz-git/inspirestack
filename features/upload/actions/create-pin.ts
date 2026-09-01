"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { createPinSchema } from "../schemas/create-pin-schema";
import { createPinService } from "../services/create-pin";
import { deleteImage } from "../services/delete-image";
import { uploadImage } from "../services/upload-image";

type CreatePinActionResult =
  | {
      success: true;
      pinId: string;
      username: string;
    }
  | {
      success: false;
      error: string;
    };

export async function createPinAction(
  formData: FormData,
): Promise<CreatePinActionResult> {
  const session = await auth();

  if (!session?.user?.id || !session.user.username) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  const parsed = createPinSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    topicId: formData.get("topicId"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ??
        "Invalid form data.",
    };
  }

  const tags = formData
    .getAll("tags")
    .filter(
      (value): value is string =>
        typeof value === "string",
    );

  let image: Awaited<
    ReturnType<typeof uploadImage>
  > | null = null;

  try {
    image = await uploadImage(parsed.data.image);

    try {
      const pin = await createPinService({
        authorId: session.user.id,
        topicId: parsed.data.topicId,
        title: parsed.data.title,
        description: parsed.data.description,
        imageUrl: image.imageUrl,
        imagePublicId: image.imagePublicId,
        imageWidth: image.imageWidth,
        imageHeight: image.imageHeight,
        tagNames: tags,
      });

      revalidatePath(
        `/profile/${session.user.username}`,
      );

      return {
        success: true,
        pinId: pin.id,
        username: session.user.username,
      };
    } catch (error) {
      await deleteImage(image.imagePublicId);
      throw error;
    }
  } catch (error) {
    console.error("Failed to create Pin:", error);

    return {
      success: false,
      error: "Failed to publish your Pin.",
    };
  }
}