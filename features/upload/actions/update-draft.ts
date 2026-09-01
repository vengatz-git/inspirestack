"use server";

import { auth } from "@/auth";

import { updateDraftService } from "../services/update-draft";

type UpdateDraftActionInput = {
  draftId: string;
  title?: string;
  description?: string;
  topicId?: string | null;
  tagNames?: string[];
};

type UpdateDraftActionResult =
  | {
      success: true;
      updatedAt: Date;
    }
  | {
      success: false;
      error: string;
    };

export async function updateDraftAction(
  input: UpdateDraftActionInput,
): Promise<UpdateDraftActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  try {
    const draft = await updateDraftService({
      ...input,
      authorId: session.user.id,
    });

    if (!draft) {
      return {
        success: false,
        error: "Draft not found.",
      };
    }

    return {
      success: true,
      updatedAt: draft.updatedAt,
    };
  } catch (error) {
    console.error("Failed to update draft:", error);

    return {
      success: false,
      error: "Failed to save your draft.",
    };
  }
}