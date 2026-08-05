"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import type { ActionResult } from "@/types/action-result";

import { createBoardSchema } from "../schemas/create-board-schema";
import { createBoardService } from "../services/create-board";

type BoardField =
  | "name"
  | "description"
  | "visibility";

export async function createBoardAction(
  data: Parameters<
    typeof createBoardSchema.parse
  >[0],
): Promise<ActionResult<void, BoardField>> {
  const session = await auth();

  if (!session?.user?.id || !session.user.username) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated =
    createBoardSchema.safeParse(data);

  if (!validated.success) {
    const fieldErrors =
      validated.error.flatten().fieldErrors;

    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: {
        name: fieldErrors.name?.[0],
        description:
          fieldErrors.description?.[0],
        visibility:
          fieldErrors.visibility?.[0],
      },
    };
  }

  await createBoardService({
    ownerId: session.user.id,
    ...validated.data,
  });

  revalidatePath(
    `/profile/${session.user.username}`,
  );

  return {
    success: true,
  };
}