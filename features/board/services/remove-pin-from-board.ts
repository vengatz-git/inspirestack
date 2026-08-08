import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards } from "@/db/schema";

import type { RemovePinInput } from "../schemas/remove-pin-schema";

export async function removePinFromBoardService(
  ownerId: string,
  { boardId, pinId }: RemovePinInput,
) {
  return db.transaction(async (tx) => {
    const board = await tx.query.boards.findFirst({
      where: and(
        eq(boards.id, boardId),
        eq(boards.ownerId, ownerId),
      ),
    });

    if (!board) {
      throw new Error("Board not found.");
    }

    const boardPin = await tx.query.boardPins.findFirst({
      where: and(
        eq(boardPins.boardId, boardId),
        eq(boardPins.pinId, pinId),
      ),
    });

    if (!boardPin) {
      throw new Error("Pin is not saved to this board.");
    }

    const wasCoverPin = board.coverPinId === pinId;

    await tx
      .delete(boardPins)
      .where(
        and(
          eq(boardPins.boardId, boardId),
          eq(boardPins.pinId, pinId),
        ),
      );

    const remainingPins = await tx.query.boardPins.findMany({
      where: eq(boardPins.boardId, boardId),
      orderBy: desc(boardPins.createdAt),
      columns: {
        pinId: true,
      },
    });

    if (remainingPins.length === 0) {
      await tx
        .update(boards)
        .set({
          coverPinId: null,
        })
        .where(eq(boards.id, boardId));
    } else if (wasCoverPin) {
      await tx
        .update(boards)
        .set({
          coverPinId: remainingPins[0].pinId,
        })
        .where(eq(boards.id, boardId));
    }

    return true;
  });
}