import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { boards } from "@/db/schema";

import { mapBoardSummary } from "../lib/map-board-summary";
import type { BoardSummary } from "../types/board";

interface GetRecentBoardsOptions {
  ownerId: string;
  limit?: number;
  pinId?: string;
}

export async function getRecentBoardsService({
  ownerId,
  limit = 5,
  pinId,
}: GetRecentBoardsOptions): Promise<BoardSummary[]> {
  const recentBoards = await db.query.boards.findMany({
    where: eq(boards.ownerId, ownerId),

    orderBy: desc(boards.lastUsedAt),

    limit,

    with: {
      coverPin: true,
      boardPins: {
        columns: {
          boardId: true,
          pinId: true,
        },
      },
    },
  });

  return recentBoards.map((board) =>
    mapBoardSummary(board, pinId),
  );
}