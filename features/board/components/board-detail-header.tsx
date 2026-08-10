import Image from "next/image";

import type { BoardDetail } from "../types/board-detail";

import { EditBoardButton } from "./edit-board-button";
import { Globe2, LockKeyhole } from "lucide-react";

type BoardDetailHeaderProps = {
  board: BoardDetail;
};

export function BoardDetailHeader({ board }: BoardDetailHeaderProps) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="bg-muted relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-3xl shadow-sm sm:aspect-square sm:w-48">
        {board.coverImageUrl ? (
          <Image
            src={board.coverImageUrl}
            alt={`${board.name} cover`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover transition-transform duration-500"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
            No cover
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {board.name}
        </h1>

        {board.description && (
          <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-7">
            {board.description}
          </p>
        )}

        <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5">
            {board.visibility === "PUBLIC" ? (
              <Globe2 className="size-4" aria-hidden="true" />
            ) : (
              <LockKeyhole className="size-4" aria-hidden="true" />
            )}

            {board.visibility === "PUBLIC" ? "Public" : "Private"}
          </span>

          <span aria-hidden="true">·</span>

          <span>
            {board.pinCount} {board.pinCount === 1 ? "Pin" : "Pins"}
          </span>
        </div>

        <div className="mt-5">
          <EditBoardButton
            boardId={board.id}
            name={board.name}
            description={board.description}
            visibility={board.visibility}
          />
        </div>
      </div>
    </header>
  );
}
