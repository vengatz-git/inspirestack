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

  boardPins: {
    boardId: string;
    pinId: string;
  }[];
};
export function mapBoardSummary(
  board: BoardWithRelations,
  pinId?: string,
): BoardSummary {

  const isSaved =
    pinId != null &&
    board.boardPins.some((boardPin) => boardPin.pinId === pinId);

  return {
    id: board.id,

    name: board.name,

    description: board.description,

    visibility: board.visibility,

    coverImageUrl: board.coverPin?.imageUrl ?? null,

    pinCount: board.boardPins.length,

    isSaved,

    createdAt: board.createdAt,

    updatedAt: board.updatedAt,
  };
}
