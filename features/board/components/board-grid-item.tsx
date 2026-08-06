import Image from "next/image";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";
import { BoardCoverPlaceholder } from "./board-cover-placeholder";

interface BoardGridItemProps {
  board: BoardSummary;
  pending: boolean;
  onSave: (boardId: string) => void;
}

export function BoardGridItem({
  board,
  pending,
  onSave,
}: BoardGridItemProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
      <div className="relative aspect-video bg-muted">
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
          className="w-full"
          variant={
            board.isSaved
              ? "secondary"
              : "outline"
          }
          disabled={pending || board.isSaved}
          onClick={() => onSave(board.id)}
        >
          {board.isSaved
            ? "✓ Saved"
            : pending
              ? "Saving..."
              : "Save"}
        </Button>
      </div>
    </div>
  );
}