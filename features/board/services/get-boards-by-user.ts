import { and, count, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards } from "@/db/schema";

import { mapBoardSummary } from "../lib/map-board-summary";
import type { BoardSummary } from "../types/board";

import type { GetBoardsByUserOptions } from "../types/get-boards-by-user";

export async function getBoardsByUserService({
  userId,
  pinId,
  includePrivate = false,
}: GetBoardsByUserOptions): Promise<BoardSummary[]> {
  const whereCondition = includePrivate
    ? eq(boards.ownerId, userId)
    : and(
        eq(boards.ownerId, userId),
        eq(boards.visibility, "PUBLIC"),
      );

  /*
   * Save dialog:
   *
   * We need boardPins here because we need to know whether
   * the current pin is already saved to each board.
   */
  if (pinId) {
    const result = await db.query.boards.findMany({
      where: whereCondition,

      orderBy: (boards, { desc }) => [
        desc(boards.lastUsedAt),
      ],

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

    return result.map((board) =>
      mapBoardSummary(board, pinId),
    );
  }

  /*
   * Profile boards:
   *
   * We only need the number of pins, not every boardPins row.
   */
  const result = await db.query.boards.findMany({
    where: whereCondition,

    orderBy: (boards, { desc }) => [
      desc(boards.lastUsedAt),
    ],

    with: {
      coverPin: {
        columns: {
          imageUrl: true,
        },
      },
    },
  });

  if (result.length === 0) {
    return [];
  }

  const boardIds = result.map((board) => board.id);

  const pinCounts = await db
    .select({
      boardId: boardPins.boardId,
      pinCount: count(boardPins.pinId),
    })
    .from(boardPins)
    .where(inArray(boardPins.boardId, boardIds))
    .groupBy(boardPins.boardId);

  const pinCountByBoardId = new Map(
    pinCounts.map((row) => [
      row.boardId,
      Number(row.pinCount),
    ]),
  );

  return result.map((board) =>
    mapBoardSummary(
      board,
      undefined,
      pinCountByBoardId.get(board.id) ?? 0,
    ),
  );
}