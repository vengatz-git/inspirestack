import { db } from "@/db";
import { boards } from "@/db/schema";

import type { NewBoardInput } from "../types/new-board";

export async function createBoardService({
  ownerId,
  name,
  description,
  visibility = "PUBLIC",
  coverPinId = null,
}: NewBoardInput) {
  const [board] = await db
    .insert(boards)
    .values({
      ownerId,
      name: name.trim(),
      description,
      visibility,
      coverPinId,
    })
    .returning();

  return board;
}