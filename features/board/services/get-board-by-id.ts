import { eq } from "drizzle-orm";

import { db } from "@/db";
import { boards } from "@/db/schema";

import { mapBoardDetail } from "../lib/map-board-detail";
import type { BoardDetail } from "../types/board-detail";

export async function getBoardByIdService(
  boardId: string,
): Promise<BoardDetail | null> {
  const board = await db.query.boards.findFirst({
    where: eq(boards.id, boardId),

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