import {
  and,
  eq,
  inArray,
} from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards } from "@/db/schema";

export async function getSavedBoardIdsForPins(
  userId: string | null | undefined,
  pinIds: string[],
) {
  const boardIdsByPin = new Map<
    string,
    string[]
  >();

  if (!userId || pinIds.length === 0) {
    return boardIdsByPin;
  }

  const rows = await db
    .select({
      pinId: boardPins.pinId,
      boardId: boardPins.boardId,
    })
    .from(boardPins)
    .innerJoin(
      boards,
      and(
        eq(boardPins.boardId, boards.id),
        eq(boards.ownerId, userId),
      ),
    )
    .where(inArray(boardPins.pinId, pinIds));

  for (const row of rows) {
    const current =
      boardIdsByPin.get(row.pinId) ?? [];

    current.push(row.boardId);
    boardIdsByPin.set(row.pinId, current);
  }

  return boardIdsByPin;
}