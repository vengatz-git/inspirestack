import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { boardPins } from "@/db/schema";

import type { SavePinInput } from "../schemas/save-pin-schema";

export async function savePinToBoardService({
  boardId,
  pinId,
}: SavePinInput) {
  const existing = await db.query.boardPins.findFirst({
    where: and(
      eq(boardPins.boardId, boardId),
      eq(boardPins.pinId, pinId),
    ),
  });

  // Already saved → nothing to do
  if (existing) {
    return existing;
  }

  const [saved] = await db
    .insert(boardPins)
    .values({
      boardId,
      pinId,
    })
    .returning();

  return saved;
}