"use client";

import { useBoardSave } from "../hooks/use-board-save";
import type { BoardSummary } from "../types/board";

import { CreateBoardButton } from "./create-board-button";
import { BoardWorkspace } from "./workspace/board-workspace";

interface BoardSelectorProps {
  pinId: string;
  boards: BoardSummary[];
  onSaved?: () => void;
}

export function BoardSelector({ pinId, boards, onSaved }: BoardSelectorProps) {
  const { pending, save } = useBoardSave({
    pinId,
    onSuccess: onSaved,
  });
  return (
    <div className="space-y-6">
      <BoardWorkspace boards={boards} pending={pending} onSave={save} />

      <div className="border-t pt-4">
        <CreateBoardButton />
      </div>
    </div>
  );
}
