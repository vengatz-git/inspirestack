import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { boards } from "@/db/schema";

import type { UpdateBoardInput } from "../schemas/update-board-schema";

export async function updateBoardService(
  ownerId: string,
  { boardId, name, description, visibility }: UpdateBoardInput,
) {
  const updatedBoard = await db
    .update(boards)
    .set({
      name,
      description: description || null,
      visibility,
    })
    .where(
      and(
        eq(boards.id, boardId),
        eq(boards.ownerId, ownerId),
      ),
    )
    .returning({
      id: boards.id,
    });

  if (updatedBoard.length === 0) {
    throw new Error("Board not found.");
  }

  return true;
}