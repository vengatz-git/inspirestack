import { and, count, eq, inArray, or } from "drizzle-orm";

import { db } from "@/db";
import { boardPins, boards, pins } from "@/db/schema";

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
            visibility: true,
            authorId: true,
          },
        },

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

    return result.map((board) => {
      const visiblePinCount = board.boardPins.filter(
        ({ pin }) =>
          pin.visibility === "PUBLIC" ||
          (includePrivate && pin.authorId === userId),
      ).length;

      return mapBoardSummary(
        board,
        pinId,
        visiblePinCount,
        includePrivate ? userId : undefined,
      );
    });
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
          visibility: true,
          authorId: true,
        },
      },
    },
  });

  if (result.length === 0) {
    return [];
  }

  const boardIds = result.map((board) => board.id);

  const visiblePinCondition = includePrivate
    ? or(
        eq(pins.visibility, "PUBLIC"),
        eq(pins.authorId, userId),
      )
    : eq(pins.visibility, "PUBLIC");

  const pinCounts = await db
    .select({
      boardId: boardPins.boardId,
      pinCount: count(boardPins.pinId),
    })
    .from(boardPins)
    .innerJoin(pins, eq(boardPins.pinId, pins.id))
    .where(
      and(
        inArray(boardPins.boardId, boardIds),
        visiblePinCondition,
      ),
    )
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
      includePrivate ? userId : undefined,
    ),
  );
}