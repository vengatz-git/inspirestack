import { NextRequest, NextResponse } from "next/server";

import { getCommentsByPinService } from "@/features/comment/services/get-comments-by-pin";

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

  const comments = await getCommentsByPinService(id);

  return NextResponse.json(comments, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}