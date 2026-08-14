import Image from "next/image";
import Link from "next/link";

import type { BoardSummary } from "@/features/board/types/board";

interface ProfileQuickAccessProps {
  boards: BoardSummary[];
}

export function ProfileQuickAccess({ boards }: ProfileQuickAccessProps) {
  if (boards.length === 0) {
    return null;
  }

  return (
    <section className="min-w-0">
      <h2 className="mb-3 hidden text-lg font-semibold md:block">
        Quick Access
      </h2>

      <div className="flex scrollbar-none gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-x-visible md:pb-0">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group bg-background hover:bg-muted flex shrink-0 items-center gap-2 rounded-full border py-1 pr-3 pl-1 transition-colors"
          >
            <div className="bg-muted relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
              {board.coverImageUrl ? (
                <Image
                  src={board.coverImageUrl}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="bg-muted h-full w-full" />
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
