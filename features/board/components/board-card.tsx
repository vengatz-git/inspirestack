import Image from "next/image";
import Link from "next/link";

import type { BoardSummary } from "../types/board";
import { BoardCoverPlaceholder } from "./board-cover-placeholder";

interface BoardCardProps {
  board: BoardSummary;
}

export function BoardCard({
  board,
}: BoardCardProps) {
  return (
    <Link
      href={`/board/${board.id}`}
      className="group block overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
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

      <div className="space-y-1 p-4">
        <h3 className="truncate font-semibold">
          {board.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {board.pinCount}{" "}
          {board.pinCount === 1 ? "pin" : "pins"}
        </p>
      </div>
    </Link>
  );
}