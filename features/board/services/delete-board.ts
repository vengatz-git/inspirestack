import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { boards } from "@/db/schema";

export async function deleteBoardService(
  userId: string,
  boardId: string,
) {
  const board = await db
    .select({
      id: boards.id,
    })
    .from(boards)
    .where(
      and(
        eq(boards.id, boardId),
        eq(boards.ownerId, userId),
      ),
    )
    .limit(1);

  if (!board[0]) {
    throw new Error("Board not found.");
  }

  await db
    .delete(boards)
    .where(eq(boards.id, boardId));

  return true;
}