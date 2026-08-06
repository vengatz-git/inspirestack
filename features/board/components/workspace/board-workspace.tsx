"use client";

import { useState } from "react";

import type { BoardSummary } from "../../types/board";
import type { BoardView } from "../../types/board-view";

import { BoardBrowser } from "./board-browser";
import { BoardSidebar } from "./board-sidebar";

interface BoardWorkspaceProps {
  boards: BoardSummary[];
  pending: boolean;
  onSave: (boardId: string) => void;
}

export function BoardWorkspace({
  boards,
  pending,
  onSave,
}: BoardWorkspaceProps) {
  const [view, setView] = useState<BoardView>("list");

  return (
    <div className="flex h-[550px]">
      <BoardSidebar />

      <BoardBrowser
        boards={boards}
        pending={pending}
        view={view}
        onViewChange={setView}
        onSave={onSave}
      />
    </div>
  );
}