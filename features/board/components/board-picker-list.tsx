import type { BoardSummary } from "../types/board";

import { BoardPickerItem } from "./board-picker-item";

interface BoardPickerListProps {
  boards: BoardSummary[];
  // pending: boolean;
  savingBoardId: string | null;
  onSave: (boardId: string) => void;
}

export function BoardPickerList({
  boards,
  savingBoardId,
  onSave,
}: BoardPickerListProps) {
  if (boards.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        You don&apos;t have any boards yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {boards.map((board) => (
        <BoardPickerItem
          key={board.id}
          board={board}
          savingBoardId={savingBoardId}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
