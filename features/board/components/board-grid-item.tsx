import Image from "next/image";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";
import { BoardCoverPlaceholder } from "./board-cover-placeholder";

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
    <div className="group border-border/50 bg-card hover:border-border overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        {board.coverImageUrl ? (
          <Image
            src={board.coverImageUrl}
            alt={board.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <BoardCoverPlaceholder />
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="truncate font-semibold">
            {board.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {board.pinCount}{" "}
            {board.pinCount === 1 ? "pin" : "pins"}
          </p>
        </div>

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