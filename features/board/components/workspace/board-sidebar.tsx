"use client";

import { CreateBoardButton } from "../create-board-button";

export function BoardSidebar() {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r">
      <div className="border-b p-6">
        <h2 className="font-semibold">
          Recently Used
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Coming soon.
        </p>
      </div>

      <div className="mt-auto border-t p-6">
        <CreateBoardButton />
      </div>
    </aside>
  );
}