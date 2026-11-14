import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { getFeed } from "@/features/feed/services/get-feed";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const rawLimit = searchParams.get("limit");
  const parsedLimit = rawLimit === null ? 30 : Number(rawLimit);
  const limit = Number.isFinite(parsedLimit) ? parsedLimit : 30;

  const cursor = searchParams.get("cursor") ?? undefined;
  const session = await auth();

  const feed = await getFeed({
    limit,
    cursor,
    viewerUserId: session?.user?.id,
  });

  return NextResponse.json(feed);
}