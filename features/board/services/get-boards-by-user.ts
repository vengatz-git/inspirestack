import { eq } from "drizzle-orm";

import { db } from "@/db";
import { boards } from "@/db/schema";

import { mapBoardSummary } from "../lib/map-board-summary";
import type { BoardSummary } from "../types/board";

import type { GetBoardsByUserOptions } from "../types/get-boards-by-user";

export async function getBoardsByUserService({
  userId,
  pinId,
}: GetBoardsByUserOptions): Promise<BoardSummary[]> {
  const result = await db.query.boards.findMany({
    where: eq(boards.ownerId, userId),

    orderBy: (boards, { desc }) => [desc(boards.lastUsedAt)],

    with: {
      coverPin: {
        columns: {
          imageUrl: true,
        },
      },

      boardPins: {
        columns: {
          boardId: true,
          pinId: true,
        },
      },
    },
  });

  return result.map((board) => mapBoardSummary(board, pinId));
}
