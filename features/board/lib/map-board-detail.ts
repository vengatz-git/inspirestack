import { mapPinToCard } from "@/features/pin/lib/map-pin-card";

import type { BoardDetail } from "../types/board-detail";

type BoardWithRelations = {
  id: string;
  name: string;
  description: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: Date;
  updatedAt: Date;

  owner: {
    id: string;
    username: string | null;
    displayName: string | null;
    image: string | null;
  };

  coverPin: {
    imageUrl: string;
  } | null;

  boardPins: {
    pin: Parameters<typeof mapPinToCard>[0];
  }[];
};

export function mapBoardDetail(
  board: BoardWithRelations,
): BoardDetail {
  return {
    id: board.id,

    name: board.name,

    description: board.description,

    visibility: board.visibility,

    owner: {
      id: board.owner.id,
      username: board.owner.username ?? "",
      displayName: board.owner.displayName,
      image: board.owner.image,
    },

    coverImageUrl:
      board.coverPin?.imageUrl ?? null,

    pinCount: board.boardPins.length,

    pins: board.boardPins.map(({ pin }) =>
      mapPinToCard(pin),
    ),

    createdAt: board.createdAt,

    updatedAt: board.updatedAt,
  };
}