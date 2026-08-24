"use client";

import { useState } from "react";

import { MasonryEngine } from "@/features/feed/components/masonry-engine";

import type { BoardDetail } from "../types/board-detail";

import { BoardEmptyState } from "./board-empty-state";
import { BoardPinCard } from "./board-pin-card";

type BoardPinGridProps = {
  boardId: string;
  pins: BoardDetail["pins"];
};

export function BoardPinGrid({
  boardId,
  pins,
}: BoardPinGridProps) {
  const [boardPins, setBoardPins] = useState(pins);

  function handleRemove(pinId: string) {
    setBoardPins((currentPins) =>
      currentPins.filter((pin) => pin.id !== pinId),
    );
  }

  if (boardPins.length === 0) {
    return <BoardEmptyState />;
  }

  return (
    <MasonryEngine
      pins={boardPins}
      renderItem={(pin) => (
        <BoardPinCard
          boardId={boardId}
          pin={pin}
          onRemove={handleRemove}
        />
      )}
    />
  );
}