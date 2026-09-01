"use server";

import { auth } from "@/auth";

import { deleteDraftService } from "../services/delete-draft";
import { deleteImage } from "../services/delete-image";

type DeleteDraftActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function deleteDraftAction(
  draftId: string,
): Promise<DeleteDraftActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  try {
    const draft = await deleteDraftService(
      draftId,
      session.user.id,
    );

    if (!draft) {
      return {
        success: false,
        error: "Draft not found.",
      };
    }

    await deleteImage(draft.imagePublicId);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to delete draft:", error);

    return {
      success: false,
      error: "Failed to discard draft.",
    };
  }
}