"use client";

import { Input } from "@/components/ui/input";
import type { BoardSummary } from "../types/board";

import { BoardPickerList } from "./board-picker-list";
import { CreateBoardButton } from "./create-board-button";

interface BoardCommandPaletteProps {
  boards: BoardSummary[];

  pending: boolean;

  onSave: (boardId: string) => void;
}

export function BoardCommandPalette({
  boards,
  pending,
  onSave,
}: BoardCommandPaletteProps) {
  return (
    <div className="flex h-140 flex-col">
      {/* Header */}

      <div className="space-y-4 border-b pb-4">
        <Input placeholder="Search boards..." />
        <CreateBoardButton />
      </div>

      {/* Scrollable */}

      <div className="mt-4 flex-1 overflow-y-auto pr-2">
        <BoardPickerList boards={boards} pending={pending} onSave={onSave} />
      </div>
    </div>
  );
}
