"use client";

import { useState } from "react";

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
  const [directSaved, setDirectSaved] = useState(saved);

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(
    () => boards[0]?.id ?? null,
  );

  const [boardSavedOverride, setBoardSavedOverride] = useState<{
    boardId: string;
    saved: boolean;
  } | null>(null);

  const selectedBoard =
    boards.find((board) => board.id === selectedBoardId) ??
    boards[0] ??
    null;

  const selectedBoardSaved = selectedBoard
    ? boardSavedOverride?.boardId === selectedBoard.id
      ? boardSavedOverride.saved
      : savedBoardIds.includes(selectedBoard.id)
    : false;

  function handleSelectBoard(boardId: string) {
    if (!boards.some((board) => board.id === boardId)) {
      return;
    }

    setSelectedBoardId(boardId);
  }

  function handleSaved(nextSaved: boolean) {
    if (selectedBoard) {
      setBoardSavedOverride({
        boardId: selectedBoard.id,
        saved: nextSaved,
      });

      return;
    }

    setDirectSaved(nextSaved);
  }

  const saveState = selectedBoard
    ? selectedBoardSaved
    : directSaved;

  return (
    <div className="pointer-events-auto absolute inset-x-3 top-3 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <div className="min-w-0">
        {boards.length > 0 && (
          <PinCardBoardPicker
            boards={boards}
            selectedBoardId={selectedBoard?.id ?? null}
            selectedBoardName={selectedBoard?.name ?? null}
            onSelectBoard={handleSelectBoard}
          />
        )}
      </div>

      <div className="ml-auto shrink-0">
        <PinCardSaveButton
          key={selectedBoard?.id ?? "direct-save"}
          pinId={pinId}
          boardId={selectedBoard?.id ?? null}
          initialSaved={saveState}
          onSaved={handleSaved}
        />
      </div>
    </div>
  );
}