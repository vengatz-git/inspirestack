"use client";

import type { BoardSummary } from "../../types/board";
import type { BoardView } from "../../types/board-view";

import { BoardPickerGrid } from "../board-picker-grid";
import { BoardPickerList } from "../board-picker-list";

import { BoardSearchEmpty } from "./board-search-empty";

interface BoardBrowserProps {
  boards: BoardSummary[];
  pending: boolean;
  savingBoardId: string | null;
  view: BoardView;
  onSave: (boardId: string) => void;
}

export function BoardBrowser({
  boards,
  pending,
  savingBoardId,
  view,
  onSave,
}: BoardBrowserProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 transition-all duration-200 ease-out md:px-6 md:py-5">
        <div
          key={view}
          className="animate-in fade-in-0 duration-200"
        >
          {boards.length === 0 ? (
            <BoardSearchEmpty />
          ) : view === "list" ? (
            <BoardPickerList
              boards={boards}
              savingBoardId={savingBoardId}
              onSave={onSave}
            />
          ) : (
            <BoardPickerGrid
              boards={boards}
              savingBoardId={savingBoardId}
              onSave={onSave}
            />
          )}
        </div>
      </div>
    </section>
  );
}