import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { getCommentsByPinService } from "@/features/comment/services/get-comments-by-pin";
import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";

type CommentsRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: CommentsRouteProps,
) {
  const { id } = await params;
  const session = await auth();
  const pin = await getPinByIdService(id, session?.user?.id);

  if (!pin) {
    return NextResponse.json(
      { error: "Pin not found." },
      { status: 404 },
    );
  }

  const comments = await getCommentsByPinService(id);

  return NextResponse.json(comments, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}