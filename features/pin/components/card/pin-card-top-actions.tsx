"use client";

import { useEffect, useState } from "react";

import type { BoardSummary } from "@/features/board/types/board";

import { PinCardBoardPicker } from "./pin-card-board-picker";
import { PinCardSaveButton } from "./pin-card-save-button";

interface PinCardTopActionsProps {
  pinId: string;
  saved?: boolean;
  savedBoardIds?: string[];
  boards: BoardSummary[];
}

export function PinCardTopActions({
  pinId,
  saved = false,
  savedBoardIds = [],
  boards,
}: PinCardTopActionsProps) {
  const [directSaved, setDirectSaved] =
    useState(saved);

  const [selectedBoard, setSelectedBoard] =
    useState<BoardSummary | null>(() => {
      const board = boards[0];

      return board
        ? {
            ...board,
            isSaved: savedBoardIds.includes(
              board.id,
            ),
          }
        : null;
    });

  useEffect(() => {
    setSelectedBoard((currentBoard) => {
      if (boards.length === 0) {
        return null;
      }

      const nextBoard =
        boards.find(
          (board) => board.id === currentBoard?.id,
        ) ?? boards[0];

      return nextBoard
        ? {
            ...nextBoard,
            isSaved: savedBoardIds.includes(
              nextBoard.id,
            ),
          }
        : null;
    });
  }, [boards, savedBoardIds]);

  function handleSelectBoard(boardId: string) {
    const board = boards.find(
      (item) => item.id === boardId,
    );

    setSelectedBoard(
      board
        ? {
            ...board,
            isSaved: savedBoardIds.includes(
              board.id,
            ),
          }
        : null,
    );
  }

  function handleSaved(nextSaved: boolean) {
    if (selectedBoard) {
      setSelectedBoard((currentBoard) =>
        currentBoard
          ? {
              ...currentBoard,
              isSaved: nextSaved,
            }
          : null,
      );

      return;
    }

    setDirectSaved(nextSaved);
  }

  const saveState = selectedBoard
    ? selectedBoard.isSaved
    : directSaved;

  return (
    <div className="pointer-events-auto absolute inset-x-3 top-3 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <div className="min-w-0 flex-1">
        {boards.length > 0 && (
          <PinCardBoardPicker
            boards={boards}
            selectedBoardId={
              selectedBoard?.id ?? null
            }
            selectedBoardName={
              selectedBoard?.name ?? null
            }
            onSelectBoard={handleSelectBoard}
          />
        )}
      </div>

      <PinCardSaveButton
        key={selectedBoard?.id ?? "direct-save"}
        pinId={pinId}
        boardId={selectedBoard?.id ?? null}
        initialSaved={saveState}
        onSaved={handleSaved}
      />
    </div>
  );
}