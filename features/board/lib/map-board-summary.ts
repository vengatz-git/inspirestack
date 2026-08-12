import type { BoardSummary } from "../types/board";

type BoardWithRelations = {
  id: string;
  name: string;
  description: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: Date;
  updatedAt: Date;

  coverPin: {
    imageUrl: string;
  } | null;

  boardPins?: {
    boardId: string;
    pinId: string;
  }[];

  pinCount?: number;
};

export function mapBoardSummary(
  board: BoardWithRelations,
  pinId?: string,
  pinCount?: number,
): BoardSummary {
  const isSaved =
    pinId != null &&
    (board.boardPins?.some(
      (boardPin) => boardPin.pinId === pinId,
    ) ?? false);

  return {
    id: board.id,

    name: board.name,

    description: board.description,

    visibility: board.visibility,

    coverImageUrl: board.coverPin?.imageUrl ?? null,

    pinCount: pinCount ?? board.boardPins?.length ?? 0,

    isSaved,

    createdAt: board.createdAt,

    updatedAt: board.updatedAt,
  };
}