import { NextRequest, NextResponse } from "next/server";

import { createBoard } from "@/lib/db/queries/boards";
import { getBoardsByProfileId } from "@/lib/db/queries/boards";
import { getProfileByUsername } from "@/lib/db/queries/profiles";

export async function POST(request: NextRequest) {
  try {
    // TODO: Restore Clerk authentication after testing
    const profile = await getProfileByUsername("test_jZznTV");

    if (!profile) {
      return NextResponse.json(
        {
          error: "Profile not found",
        },
        {
          status: 404,
        }
      );
    }

    const {
      title,
      description = "",
      isPrivate = false,
    } = await request.json();

    const trimmedTitle = title?.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      return NextResponse.json(
        {
          error: "Title is required",
        },
        {
          status: 400,
        }
      );
    }

    if (trimmedTitle.length > 100) {
      return NextResponse.json(
        {
          error: "Title must be less than 100 characters.",
        },
        {
          status: 400,
        }
      );
    }

    if (trimmedDescription.length > 500) {
      return NextResponse.json(
        {
          error: "Description must be less than 500 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const board = await createBoard({
      title: trimmedTitle,
      description: trimmedDescription,
      isPrivate,
      profileId: profile.id,
    });

    return NextResponse.json(board, {
      status: 201,
    });
  } catch (error) {
    console.error("[CREATE_BOARD]", error);

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

export async function GET() {
  try {
    // TODO: Restore Clerk auth later
    const profile = await getProfileByUsername("test_jZznTV");

    if (!profile) {
      return NextResponse.json(
        {
          error: "Profile not found",
        },
        {
          status: 404,
        }
      );
    }

    const boards = await getBoardsByProfileId({
      profileId: profile.id,
    });

    return NextResponse.json(boards);
  } catch (error) {
    console.error("[GET_BOARDS]", error);

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