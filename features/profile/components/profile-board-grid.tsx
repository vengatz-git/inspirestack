import { BoardCard } from "@/features/board/components/board-card";
import type { BoardSummary } from "@/features/board/types/board";

interface ProfileBoardGridProps {
  boards: BoardSummary[];
  isOwner: boolean;
}

export function ProfileBoardGrid({
  boards,
  isOwner,
}: ProfileBoardGridProps) {
  if (boards.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-semibold">
          No boards yet
        </h3>

        <p className="text-muted-foreground mt-2 text-sm">
          {isOwner
            ? "Create a board to start organizing your inspiration."
            : "This user hasn't created any boards yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
        />
      ))}
    </div>
  );
}