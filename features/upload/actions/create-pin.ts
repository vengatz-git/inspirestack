"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { drafts } from "@/db/schema";

import { createPinSchema } from "../schemas/create-pin-schema";
import { createPinService } from "../services/create-pin";
import { deleteDraftService } from "../services/delete-draft";
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

  const title = formData.get("title");
  const description = formData.get("description");
  const boardId = formData.get("boardId");
  const draftId = formData.get("draftId");
  const imageRaw = formData.get("image");

  const parsed = createPinSchema.safeParse({
    title: typeof title === "string" ? title : undefined,
    description: typeof description === "string" ? description : undefined,
    image: imageRaw instanceof File && imageRaw.size > 0 ? imageRaw : undefined,
    draftId: typeof draftId === "string" && draftId ? draftId : undefined,
    topicId: formData.get("topicId"),
    boardId:
      typeof boardId === "string" && boardId ? boardId : undefined,
    visibility: formData.get("visibility"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  const tags = formData
    .getAll("tags")
    .filter((value): value is string => typeof value === "string");

  let existingDraft = null;
  if (parsed.data.draftId) {
    existingDraft = await db.query.drafts.findFirst({
      where: and(
        eq(drafts.id, parsed.data.draftId),
        eq(drafts.authorId, session.user.id),
      ),
    });
  }

  let imageInfo: {
    imageUrl: string;
    imagePublicId: string;
    imageWidth: number;
    imageHeight: number;
  };
  let shouldDeleteUploadedImageOnFailure = false;

  try {
    if (parsed.data.image instanceof File && parsed.data.image.size > 0) {
      const uploaded = await uploadImage(parsed.data.image);
      imageInfo = uploaded;
      shouldDeleteUploadedImageOnFailure = true;

      // If replacing a draft's image with a new image, clean up the old draft image
      if (
        existingDraft &&
        existingDraft.imagePublicId !== uploaded.imagePublicId
      ) {
        await deleteImage(existingDraft.imagePublicId);
      }
    } else if (existingDraft) {
      imageInfo = {
        imageUrl: existingDraft.imageUrl,
        imagePublicId: existingDraft.imagePublicId,
        imageWidth: existingDraft.imageWidth,
        imageHeight: existingDraft.imageHeight,
      };
    } else {
      return {
        success: false,
        error: "Please select an image.",
      };
    }

    try {
      const pin = await createPinService({
        authorId: session.user.id,
        topicId: parsed.data.topicId,
        boardId: parsed.data.boardId || undefined,
        visibility: parsed.data.visibility,
        title: parsed.data.title,
        description: parsed.data.description,
        imageUrl: imageInfo.imageUrl,
        imagePublicId: imageInfo.imagePublicId,
        imageWidth: imageInfo.imageWidth,
        imageHeight: imageInfo.imageHeight,
        tagNames: tags,
      });

      // Delete draft from DB if this pin was published from a draft
      if (parsed.data.draftId) {
        await deleteDraftService(parsed.data.draftId, session.user.id);
      }

      revalidatePath(`/profile/${session.user.username}`);

      if (parsed.data.boardId) {
        revalidatePath(`/board/${parsed.data.boardId}`);
      }

      return {
        success: true,
        pinId: pin.id,
        username: session.user.username,
      };
    } catch (error) {
      if (shouldDeleteUploadedImageOnFailure) {
        await deleteImage(imageInfo.imagePublicId);
      }
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
