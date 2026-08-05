import type { BoardSummary } from "../types/board";

import { BoardPickerItem } from "./board-picker-item";

interface BoardPickerListProps {
  boards: BoardSummary[];
  pending: boolean;
  onSave: (boardId: string) => void;
}

export function BoardPickerList({
  boards,
  pending,
  onSave,
}: BoardPickerListProps) {
  if (boards.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        You don't have any boards yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {boards.map((board) => (
        <BoardPickerItem
          key={board.id}
          board={board}
          pending={pending}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
