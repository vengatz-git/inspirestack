import Image from "next/image";
import Link from "next/link";

import type { BoardSummary } from "@/features/board/types/board";

interface ProfileQuickAccessProps {
  boards: BoardSummary[];
}

export function ProfileQuickAccess({
  boards,
}: ProfileQuickAccessProps) {
  if (boards.length === 0) {
    return null;
  }

  return (
    <section className="min-w-0">
      <h2 className="mb-3 text-lg font-semibold">
        Quick Access
      </h2>

      <div className="flex flex-wrap gap-2">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group flex items-center gap-2 rounded-full border bg-background py-1 pr-3 pl-1 transition-colors hover:bg-muted"
          >
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
              {board.coverImageUrl ? (
                <Image
                  src={board.coverImageUrl}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>

            <span className="max-w-32 truncate text-sm font-medium">
              {board.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}