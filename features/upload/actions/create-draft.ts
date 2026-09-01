"use server";

import { auth } from "@/auth";

import { createDraftService } from "../services/create-draft";
import { deleteImage } from "../services/delete-image";
import { uploadDraftImage } from "../services/upload-draft-image";

type CreateDraftInput = {
  file: File;
  title?: string;
  description?: string;
  topicId?: string | null;
  tagNames?: string[];
};

type CreateDraftActionResult =
  | {
      success: true;
      draftId: string;
    }
  | {
      success: false;
      error: string;
    };

export async function createDraftAction(
  input: CreateDraftInput,
): Promise<CreateDraftActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  if (
    !(input.file instanceof File) ||
    input.file.size === 0
  ) {
    return {
      success: false,
      error: "Please select an image.",
    };
  }

  let image: Awaited<
    ReturnType<typeof uploadDraftImage>
  > | null = null;

  try {
    image = await uploadDraftImage(input.file);

    try {
      const draft = await createDraftService({
        authorId: session.user.id,
        imageUrl: image.imageUrl,
        imagePublicId: image.imagePublicId,
        imageWidth: image.imageWidth,
        imageHeight: image.imageHeight,
        title: input.title,
        description: input.description,
        topicId: input.topicId ?? null,
        tagNames: input.tagNames,
      });

      return {
        success: true,
        draftId: draft.id,
      };
    } catch (error) {
      await deleteImage(image.imagePublicId);
      throw error;
    }
  } catch (error) {
    console.error("Failed to create draft:", error);

    return {
      success: false,
      error: "Failed to save your draft.",
    };
  }
}