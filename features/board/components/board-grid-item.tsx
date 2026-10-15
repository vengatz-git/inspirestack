import { BookmarkX, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";

import { BoardCard } from "./board-card";

interface BoardGridItemProps {
  board: BoardSummary;
  savingBoardId: string | null;
  onSave: (
    boardId: string,
    isSaved?: boolean,
  ) => void;
}

export function BoardGridItem({
  board,
  savingBoardId,
  onSave,
}: BoardGridItemProps) {
  const isSaving = savingBoardId === board.id;

  return (
    <div>
      <BoardCard board={board} />

      <div className="mt-3">
        <Button
          type="button"
          className="w-full gap-2"
          variant={board.isSaved ? "destructive" : "outline"}
          disabled={isSaving}
          onClick={() => onSave(board.id, board.isSaved)}
        >
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {board.isSaved ? "Removing..." : "Saving..."}
            </>
          ) : board.isSaved ? (
            <>
              <BookmarkX className="size-4" />
              Remove
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}