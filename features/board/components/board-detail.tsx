import type { BoardDetail as BoardDetailData } from "../types/board-detail";

import { BoardDetailHeader } from "./board-detail-header";
import { BoardEmptyState } from "./board-empty-state";
import { BoardPinGrid } from "./board-pin-grid";

type BoardDetailProps = {
  board: BoardDetailData;
};

export function BoardDetail({ board }: BoardDetailProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <BoardDetailHeader board={board} />

      <section className="mt-10">
        {board.pins.length > 0 ? (
          <BoardPinGrid boardId={board.id} pins={board.pins} />
        ) : (
          <BoardEmptyState />
        )}
      </section>
    </main>
  );
}
