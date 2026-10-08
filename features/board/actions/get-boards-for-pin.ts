"use server";

import { auth } from "@/auth";
import type { BoardSummary } from "../types/board";
import { getBoardsByUserService } from "../services/get-boards-by-user";
import type { ActionResult } from "@/types/action-result";
import { savePinSchema } from "../schemas/save-pin-schema";

export async function getBoardsForPinAction(
  pinId: string,
): Promise<ActionResult<BoardSummary[]>> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = savePinSchema
    .pick({ pinId: true })
    .safeParse({ pinId });

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid Pin.",
    };
  }

  try {
    const boards = await getBoardsByUserService({
      userId: session.user.id,
      pinId: validated.data.pinId,
      includePrivate: true,
    });

    return {
      success: true,
      data: boards,
    };
  } catch {
    return {
      success: false,
      error: "Unable to load boards.",
    };
  }
}