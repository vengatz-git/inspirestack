import Image from "next/image";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../types/board";

interface BoardPickerItemProps {
  board: BoardSummary;
  pending: boolean;
  onSave: (boardId: string) => void;
}

export function BoardPickerItem({
  board,
  pending,
  onSave,
}: BoardPickerItemProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        {board.coverImageUrl ? (
          <Image
            src={board.coverImageUrl}
            alt={board.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            📁
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{board.name}</h3>

          <p className="text-muted-foreground mt-1 text-sm">
            {board.pinCount} pins
          </p>
        </div>

        <Button
          size="sm"
          disabled={pending || board.isSaved}
          variant={board.isSaved ? "secondary" : "default"}
          onClick={() => onSave(board.id)}
        >
          {board.isSaved ? "✓ Saved" : pending ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
