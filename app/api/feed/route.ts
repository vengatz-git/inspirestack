import { NextRequest, NextResponse } from "next/server";

import { HomeFeed } from "@/features/feed";
import { getFeed } from "@/features/feed/services/get-feed";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const limit = Number(searchParams.get("limit") ?? 30);

  const cursor = searchParams.get("cursor") ?? undefined;

  const feed = await getFeed({
    limit,
    cursor,
  });

  return NextResponse.json(feed);
}