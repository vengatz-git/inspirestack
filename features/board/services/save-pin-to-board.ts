import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards } from "@/db/schema";

import type { SavePinInput } from "../schemas/save-pin-schema";

export async function savePinToBoardService({
  boardId,
  pinId,
}: SavePinInput) {
  return db.transaction(async (tx) => {
    const board = await tx.query.boards.findFirst({
      where: eq(boards.id, boardId),
      columns: {
        coverPinId: true,
      },
    });

    if (!board) {
      throw new Error("Board not found.");
    }

    const existing = await tx.query.boardPins.findFirst({
      where: and(
        eq(boardPins.boardId, boardId),
        eq(boardPins.pinId, pinId),
      ),
    });

    // Already saved → update recency only
    if (existing) {
      await tx
        .update(boards)
        .set({
          lastUsedAt: new Date(),
        })
        .where(eq(boards.id, boardId));

      return existing;
    }

    const [saved] = await tx
      .insert(boardPins)
      .values({
        boardId,
        pinId,
      })
      .returning();

    await tx
      .update(boards)
      .set({
        lastUsedAt: new Date(),

        ...(board.coverPinId === null && {
          coverPinId: pinId,
        }),
      })
      .where(eq(boards.id, boardId));

    return saved;
  });
}