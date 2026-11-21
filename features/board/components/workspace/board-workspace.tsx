"use client";

import { useEffect, useState } from "react";

import { BOARD_VIEW_STORAGE_KEY } from "../../constants/board-view";
import type { BoardSummary } from "../../types/board";
import type { BoardView } from "../../types/board-view";

import { BoardBrowser } from "./board-browser";
import { BoardSidebar } from "./board-sidebar";
import { BoardWorkspaceHeader } from "./board-workspace-header";
import { CreateBoardButton } from "../create-board-button";

interface BoardWorkspaceProps {
  boards: BoardSummary[];
  pending: boolean;
  savingBoardId: string | null;
  onSave: (boardId: string) => void;
  onClose: () => void;
}

export function BoardWorkspace({
  boards,
  pending,
  savingBoardId,
  onSave,
  onClose,
}: BoardWorkspaceProps) {
  const [view, setView] = useState<BoardView>(() => {
    if (typeof window === "undefined") {
      return "list";
    }

    const saved = localStorage.getItem(
      BOARD_VIEW_STORAGE_KEY,
    );

    return saved === "grid" ? "grid" : "list";
  });

  useEffect(() => {
    localStorage.setItem(
      BOARD_VIEW_STORAGE_KEY,
      view,
    );
  }, [view]);

  const [query, setQuery] = useState("");

  const filteredBoards = boards.filter((board) =>
    board.name
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-137.5">
      <div className="hidden md:flex">
        <BoardSidebar
          boards={boards}
          pending={pending}
          onSave={onSave}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <BoardWorkspaceHeader
          view={view}
          onViewChange={setView}
          query={query}
          onQueryChange={setQuery}
          onClose={onClose}
        />

        <BoardBrowser
          boards={filteredBoards}
          pending={pending}
          savingBoardId={savingBoardId}
          view={view}
          onSave={onSave}
        />

        <div className="border-border/40 border-t p-3 shrink-0 flex justify-center md:hidden bg-background">
          <CreateBoardButton className="w-full" />
        </div>
      </div>
    </div>
  );
}
