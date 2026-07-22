import { NextRequest, NextResponse } from "next/server";

import {
  getBoardById,
  getPostById,
  isPinSavedToBoard,
  removePinFromBoard,
} from "@/lib/db/queries/boards";

interface RouteParams {
  params: Promise<{
    boardId: string;
    postId: string;
  }>;
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { boardId, postId } = await params;

    // Check if the board exists
    const board = await getBoardById({
      boardId,
    });

    if (!board) {
      return NextResponse.json(
        { error: "Board not found." },
        { status: 404 }
      );
    }

    // Check if the post exists
    const post = await getPostById({
      postId,
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found." },
        { status: 404 }
      );
    }

    // Check if the pin is saved in the board
    const savedPin = await isPinSavedToBoard({
      boardId,
      postId,
    });

    if (!savedPin) {
      return NextResponse.json(
        { error: "Pin is not saved in this board." },
        { status: 404 }
      );
    }

    // Remove the pin
    await removePinFromBoard({
      boardId,
      postId,
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error("Failed to remove pin from board:", error);

    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}