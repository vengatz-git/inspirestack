import { notFound } from "next/navigation";

import { getBoardByIdService } from "@/features/board/services/get-board-by-id";
import { BoardDetail } from "@/features/board/components/board-detail";

type BoardPageProps = {
  params: Promise<{
    boardId: string;
  }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = await params;

  const board = await getBoardByIdService(boardId);

  if (!board) {
    notFound();
  }

  return <BoardDetail board={board} />;
}