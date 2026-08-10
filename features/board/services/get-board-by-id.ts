import { and, eq, or } from "drizzle-orm";

import { db } from "@/db";
import { boards } from "@/db/schema";

import { mapBoardDetail } from "../lib/map-board-detail";
import type { BoardDetail } from "../types/board-detail";

export async function getBoardByIdService(
  boardId: string,
  viewerId?: string,
): Promise<BoardDetail | null> {
  const accessCondition = viewerId
    ? or(
        eq(boards.visibility, "PUBLIC"),
        eq(boards.ownerId, viewerId),
      )
    : eq(boards.visibility, "PUBLIC");

  const board = await db.query.boards.findFirst({
    where: and(
      eq(boards.id, boardId),
      accessCondition,
    ),

    with: {
      owner: true,

      coverPin: {
        columns: {
          imageUrl: true,
        },
      },

      boardPins: {
        with: {
          pin: {
            with: {
              author: true,
              topic: true,
            },
          },
        },
      },
    },
  });

  if (!board) {
    return null;
  }

  return mapBoardDetail(board);
}