import Image from "next/image";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";
import { BoardCoverPlaceholder } from "./board-cover-placeholder";

interface BoardPickerItemProps {
  board: BoardSummary;
  pending: boolean;
  layout?: "list" | "grid";
  onSave: (boardId: string) => void;
}

export function BoardPickerItem({
  board,
  pending,
  layout = "list",
  onSave,
}: BoardPickerItemProps) {
  return (
    <div
      className={
        layout === "list"
          ? "group border-border/50 bg-card hover:border-border hover:bg-accent/20 flex items-center gap-4 rounded-2xl border px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          : "group border-border/50 bg-card hover:border-border overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      }
    >
      <div className="bg-muted relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
        {board.coverImageUrl ? (
          <Image
            src={board.coverImageUrl}
            alt={board.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <BoardCoverPlaceholder />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base leading-tight font-semibold">
          {board.name}
        </h3>

        <p className="text-muted-foreground mt-1 text-sm">
          {board.pinCount} {board.pinCount === 1 ? "pin" : "pins"}
        </p>
      </div>

      <Button
        size="sm"
        variant={board.isSaved ? "secondary" : "outline"}
        disabled={pending || board.isSaved}
        onClick={() => onSave(board.id)}
      >
        {board.isSaved ? "✓ Saved" : pending ? "Saving…" : "Save"}
      </Button>
    </div>
  );
}
