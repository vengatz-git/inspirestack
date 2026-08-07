"use client";

import { useBoardSave } from "../hooks/use-board-save";
import type { BoardSummary } from "../types/board";
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
    <BoardWorkspace
      boards={boards}
      pending={pending}
      onSave={save}
      onClose={onSaved ?? (() => {})}
    />
  );
}
