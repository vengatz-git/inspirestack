import Image from "next/image";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";

import { BoardCoverPlaceholder } from "./board-cover-placeholder";

interface BoardPickerItemProps {
  board: BoardSummary;
  savingBoardId: string | null;
  layout?: "list" | "grid";
  onSave: (boardId: string) => void;
}

export function BoardPickerItem({
  board,
  savingBoardId,
  layout = "list",
  onSave,
}: BoardPickerItemProps) {
  const isSaving = savingBoardId === board.id;

  return (
    <div
      className={
        layout === "list"
          ? "group border-border/50 bg-card hover:border-border hover:bg-accent/20 flex items-center gap-4 rounded-2xl border px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          : "group border-border/50 bg-card hover:border-border overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      }
    >
      {layout === "list" ? (
        <div className="bg-muted relative h-18 w-18 shrink-0 overflow-hidden rounded-xl">
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
      ) : (
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
      )}

      <div
        className={
          layout === "list"
            ? "min-w-0 flex-1"
            : "flex items-center justify-between p-4"
        }
      >
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold leading-tight">
            {board.name}
          </h3>

          <p className="text-muted-foreground mt-1 text-sm">
            {board.pinCount} {board.pinCount === 1 ? "pin" : "pins"}
          </p>
        </div>

        <Button
          size="sm"
          className="min-w-22 gap-2"
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