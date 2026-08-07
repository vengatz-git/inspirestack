"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import type { BoardSummary } from "../../types/board";
import { BoardCoverPlaceholder } from "../board-cover-placeholder";

interface RecentBoardListProps {
  boards: BoardSummary[];
  pending: boolean;
  onSave: (boardId: string) => void;
}

export function RecentBoardList({
  boards,
  pending,
  onSave,
}: RecentBoardListProps) {
  const recentBoards = boards.filter((board) => board.pinCount > 0).slice(0, 5);

  if (recentBoards.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Your recently used boards will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {recentBoards.map((board) => (
        <Button
          key={board.id}
          variant="ghost"
          disabled={pending}
          onClick={() => onSave(board.id)}
          className="h-auto w-full justify-start rounded-xl p-2"
        >
          <div className="flex w-full items-center gap-3">
            <div className="bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
              {board.coverImageUrl ? (
                <Image
                  src={board.coverImageUrl}
                  alt={board.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <BoardCoverPlaceholder />
              )}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium">{board.name}</p>

              <p className="text-muted-foreground text-xs">
                {board.pinCount} {board.pinCount === 1 ? "pin" : "pins"}
              </p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}
