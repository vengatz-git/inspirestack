import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards, savedPins } from "@/db/schema";

export async function removeSavedPinService(
  userId: string,
  pinId: string,
) {
  return db.transaction(async (tx) => {
    // 1. Delete from direct saved pins
    const removedDirect = await tx
      .delete(savedPins)
      .where(
        and(
          eq(savedPins.userId, userId),
          eq(savedPins.pinId, pinId),
        ),
      )
      .returning({
        pinId: savedPins.pinId,
      });

    // 2. Find any user-owned boards containing this pin
    const userBoardsWithPin = await tx
      .select({
        boardId: boards.id,
        coverPinId: boards.coverPinId,
      })
      .from(boardPins)
      .innerJoin(boards, eq(boardPins.boardId, boards.id))
      .where(
        and(
          eq(boards.ownerId, userId),
          eq(boardPins.pinId, pinId),
        ),
      );

    // 3. Remove pin from each board and update cover pin if needed
    for (const b of userBoardsWithPin) {
      await tx
        .delete(boardPins)
        .where(
          and(
            eq(boardPins.boardId, b.boardId),
            eq(boardPins.pinId, pinId),
          ),
        );

      if (b.coverPinId === pinId) {
        const remainingPins = await tx.query.boardPins.findMany({
          where: eq(boardPins.boardId, b.boardId),
          orderBy: desc(boardPins.createdAt),
          columns: {
            pinId: true,
          },
        });

        await tx
          .update(boards)
          .set({
            coverPinId: remainingPins[0]?.pinId ?? null,
          })
          .where(eq(boards.id, b.boardId));
      }
    }

    return removedDirect.length > 0 || userBoardsWithPin.length > 0;
  });
}
