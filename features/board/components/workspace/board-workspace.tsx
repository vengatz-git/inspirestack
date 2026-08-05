"use client";

import type { BoardSummary } from "../../types/board";

import { BoardSidebar } from "./board-sidebar";
import { BoardBrowser } from "./board-browser";

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
  return (
    <div className="flex h-175">
      <BoardSidebar />

      <BoardBrowser
        boards={boards}
        pending={pending}
        onSave={onSave}
      />
    </div>
  );
}