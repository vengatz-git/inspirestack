"use client";

import { Input } from "@/components/ui/input";

import type { BoardSummary } from "../../types/board";

import { BoardPickerList } from "../board-picker-list";

interface BoardBrowserProps {
  boards: BoardSummary[];
  pending: boolean;
  onSave: (boardId: string) => void;
}

export function BoardBrowser({
  boards,
  pending,
  onSave,
}: BoardBrowserProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <div className="border-b p-6">
        <Input
          placeholder="Search boards..."
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <BoardPickerList
          boards={boards}
          pending={pending}
          onSave={onSave}
        />
      </div>
    </section>
  );
}