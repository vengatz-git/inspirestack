import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { boardPins } from "@/db/schema";

import type { RemovePinInput } from "../schemas/remove-pin-schema";

export async function removePinFromBoardService({
  boardId,
  pinId,
}: RemovePinInput) {
  await db
    .delete(boardPins)
    .where(
      and(
        eq(boardPins.boardId, boardId),
        eq(boardPins.pinId, pinId),
      ),
    );

  return true;
}