"use client";

import { Clock3 } from "lucide-react";

import { CreateBoardButton } from "../create-board-button";
import { RecentBoardList } from "./recent-board-list";
import { BoardSummary } from "../../types/board";

interface BoardSidebarProps {
  boards: BoardSummary[];
  pending: boolean;
  onSave: (boardId: string) => void;
}

export function BoardSidebar({ boards, pending, onSave }: BoardSidebarProps) {
  return (
    <aside className="border-border/40 bg-muted/10 flex w-56 shrink-0 flex-col border-r">
      <div className="space-y-8 p-6">
        <div>
          <h2 className="text-lg font-semibold">Quick Access</h2>

          <p className="text-muted-foreground mt-2 text-sm">
            Save your inspiration into organized collections.
          </p>
        </div>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Clock3 className="size-4" />

            <span className="text-sm font-medium">Recently Used</span>
          </div>

          <RecentBoardList boards={boards} pending={pending} onSave={onSave} />
        </section>
      </div>

      <div className="border-border/40 mt-auto flex justify-center border-t p-6">
        <CreateBoardButton />
      </div>
    </aside>
  );
}
