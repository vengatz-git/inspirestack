import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { boards } from "@/db/schema";

import { mapBoardSummary } from "../lib/map-board-summary";
import type { BoardSummary } from "../types/board";

interface GetRecentBoardsOptions {
  ownerId: string;
  limit?: number;
  pinId?: string;
  includePrivate?: boolean;
}

export async function getRecentBoardsService({
  ownerId,
  limit = 5,
  pinId,
  includePrivate = false,
}: GetRecentBoardsOptions): Promise<BoardSummary[]> {
  const visibilityCondition = includePrivate
    ? undefined
    : eq(boards.visibility, "PUBLIC");

  const recentBoards = await db.query.boards.findMany({
    where: visibilityCondition
      ? and(
          eq(boards.ownerId, ownerId),
          visibilityCondition,
        )
      : eq(boards.ownerId, ownerId),

    orderBy: desc(boards.lastUsedAt),

    limit,

    with: {
      coverPin: true,
      boardPins: {
        columns: {
          boardId: true,
          pinId: true,
        },
        with: {
          pin: {
            columns: {
              visibility: true,
              authorId: true,
            },
          },
        },
      },
    },
  });

  return recentBoards.map((board) => {
    const visibleBoardPins = board.boardPins.filter(
      ({ pin }) =>
        pin.visibility === "PUBLIC" ||
        (includePrivate && pin.authorId === ownerId),
    );

    return mapBoardSummary(
      {
        ...board,
        boardPins: visibleBoardPins,
      },
      pinId,
      undefined,
      includePrivate ? ownerId : undefined,
    );
  });
}