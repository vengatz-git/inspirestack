import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";

import { BoardCard } from "./board-card";

interface BoardGridItemProps {
  board: BoardSummary;
  savingBoardId: string | null;
  onSave: (boardId: string) => void;
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
          className="w-full gap-2"
          variant={board.isSaved ? "secondary" : "outline"}
          disabled={isSaving || board.isSaved}
          onClick={() => onSave(board.id)}
        >
          {board.isSaved ? (
            <>
              <Check className="size-4" />
              Saved
            </>
          ) : isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}