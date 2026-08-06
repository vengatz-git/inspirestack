"use client";

import { Input } from "@/components/ui/input";

import type { BoardSummary } from "../../types/board";
import type { BoardView } from "../../types/board-view";

import { BoardPickerGrid } from "../board-picker-grid";
import { BoardPickerList } from "../board-picker-list";

import { BoardViewToggle } from "./boardview-toggle";

interface BoardBrowserProps {
  boards: BoardSummary[];
  pending: boolean;
  view: BoardView;
  onSave: (boardId: string) => void;
  onViewChange: (view: BoardView) => void;
}

export function BoardBrowser({
  boards,
  pending,
  view,
  onSave,
  onViewChange,
}: BoardBrowserProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <div className="border-border/40 border-b px-6 py-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Boards</h2>

          <div className="flex items-center gap-2">
            <BoardViewToggle view={view} onChange={onViewChange} />

            {/* Close button goes here */}
          </div>
        </div>

        <Input placeholder="Search boards..." />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {view === "list" ? (
          <BoardPickerList boards={boards} pending={pending} onSave={onSave} />
        ) : (
          <BoardPickerGrid boards={boards} pending={pending} onSave={onSave} />
        )}
      </div>
    </section>
  );
}
