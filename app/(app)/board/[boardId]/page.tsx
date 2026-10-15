import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { BoardDetail } from "@/features/board/components/board-detail";
import { getBoardByIdService } from "@/features/board/services/get-board-by-id";

type BoardPageProps = {
  params: Promise<{
    boardId: string;
  }>;
};

export default async function BoardPage({
  params,
}: BoardPageProps) {
  const { boardId } = await params;
  const session = await auth();

  const board = await getBoardByIdService(
    boardId,
    session?.user?.id,
  );

  if (!board) {
    notFound();
  }

  const isOwner = session?.user?.id === board.owner.id;

  return (
    <BoardDetail
      board={board}
      isOwner={isOwner}
    />
  );
}