import type { BoardSummary } from "../types/board";

import { BoardGridItem } from "./board-grid-item";

interface BoardPickerGridProps {
  boards: BoardSummary[];
  // pending: boolean;
  savingBoardId: string | null;
  onSave: (boardId: string) => void;
}

export function BoardPickerGrid({
  boards,
  savingBoardId,
  onSave,
}: BoardPickerGridProps) {
  if (boards.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You don&apos;t have any boards yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {boards.map((board) => (
        <BoardGridItem
          key={board.id}
          board={board}
          savingBoardId={savingBoardId}
          onSave={onSave}
        />
      ))}
    </div>
  );
}