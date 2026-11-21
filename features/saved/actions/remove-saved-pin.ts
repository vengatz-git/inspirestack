"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/db";
import { boardPins, boards, savedPins } from "@/db/schema";
import { deleteNotificationBySave } from "@/features/notification/services/delete-notification-by-save";
import type { ActionResult } from "@/types/action-result";

import { removeSavedPinSchema } from "../schemas/remove-saved-pin-schema";
import { removeSavedPinService } from "../services/remove-saved-pin";

export async function removeSavedPinAction(
  data: unknown,
): Promise<ActionResult<{ removed: boolean }>> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const validated = removeSavedPinSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid request.",
    };
  }

  const removed = await removeSavedPinService(
    session.user.id,
    validated.data.pinId,
  );

  // Auto-delete SAVE notification if the user no longer has this pin saved
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

  revalidatePath("/feed");
  revalidatePath(`/pin/${validated.data.pinId}`);
  revalidatePath("/profile/[username]", "page");

  return {
    success: true,
    data: {
      removed,
    },
  };
}
