import { NextRequest, NextResponse } from "next/server";

import {
  getBoardById,
  isPinSavedToBoard,
  savePinToBoard,
} from "@/lib/db/queries/boards";
import { getPinById } from "@/lib/db/queries/posts";

interface RouteParams {
  params: Promise<{
    boardId: string;
    postId: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { boardId } = await params;

    const { postId } = await request.json();

    if (!postId?.trim()) {
      return NextResponse.json(
        {
          error: "Post ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const board = await getBoardById({
      boardId,
    });

    if (!board) {
      return NextResponse.json(
        {
          error: "Board not found.",
        },
        {
          status: 404,
        }
      );
    }

    const post = await getPinById(postId);

    if (!post) {
      return NextResponse.json(
        {
          error: "Post not found.",
        },
        {
          status: 404,
        }
      );
    }

    const existingPin = await isPinSavedToBoard({
      boardId,
      postId,
    });

    if (existingPin) {
      return NextResponse.json(
        {
          error: "Pin already saved to this board.",
        },
        {
          status: 409,
        }
      );
    }

    const savedPin = await savePinToBoard({
      boardId,
      postId,
    });

    return NextResponse.json(savedPin, {
      status: 201,
    });
  } catch (error) {
    console.error("[SAVE_PIN_TO_BOARD]", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}