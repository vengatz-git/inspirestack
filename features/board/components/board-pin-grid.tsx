"use client";

import { MasonryEngine } from "@/features/feed/components/masonry-engine";

import type { BoardDetail } from "../types/board-detail";
import { BoardPinCard } from "./board-pin-card";

type BoardPinGridProps = {
  boardId: string;
  pins: BoardDetail["pins"];
};
export function BoardPinGrid({ boardId, pins }: BoardPinGridProps) {
  return (
    <MasonryEngine
      pins={pins}
      renderItem={(pin) => <BoardPinCard boardId={boardId} pin={pin} />}
    />
  );
}
