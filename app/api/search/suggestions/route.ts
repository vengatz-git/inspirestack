import { NextRequest, NextResponse } from "next/server";

import { searchPostSuggestions } from "@/lib/db/queries/posts";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams
    .get("q")
    ?.trim();

  if (!query) {
    return NextResponse.json([]);
  }

  const suggestions =
    await searchPostSuggestions({
      query,
    });

  return NextResponse.json(suggestions);
}