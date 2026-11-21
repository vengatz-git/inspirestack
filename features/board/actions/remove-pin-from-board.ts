"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/db";
import { boardPins, boards, savedPins } from "@/db/schema";
import { deleteNotificationBySave } from "@/features/notification/services/delete-notification-by-save";
import type { ActionResult } from "@/types/action-result";

import { removePinSchema } from "../schemas/remove-pin-schema";
import { removePinFromBoardService } from "../services/remove-pin-from-board";

export async function removePinFromBoardAction(
  data: unknown,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = removePinSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  await removePinFromBoardService(session.user.id, validated.data);

  // Auto-delete SAVE notification if the user no longer has this pin saved anywhere
  try {
    const remainingBoardSaves = await db
      .select({ boardId: boardPins.boardId })
      .from(boardPins)
      .innerJoin(boards, eq(boardPins.boardId, boards.id))
      .where(
        and(
          eq(boards.ownerId, session.user.id),
          eq(boardPins.pinId, validated.data.pinId),
        ),
      )
      .limit(1);

    const remainingDirectSaves = await db
      .select({ pinId: savedPins.pinId })
      .from(savedPins)
      .where(
        and(
          eq(savedPins.userId, session.user.id),
          eq(savedPins.pinId, validated.data.pinId),
        ),
      )
      .limit(1);

    if (remainingBoardSaves.length === 0 && remainingDirectSaves.length === 0) {
      await deleteNotificationBySave(session.user.id, validated.data.pinId);
    }
  } catch (error) {
    console.error("Failed to remove save notification:", error);
  }

  revalidatePath(`/board/${validated.data.boardId}`);
  revalidatePath(`/pin/${validated.data.pinId}`);

  return {
    success: true,
  };
}
