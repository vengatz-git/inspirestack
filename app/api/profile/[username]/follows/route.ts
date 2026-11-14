// app/api/profile/[username]/follows/route.ts
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { getProfileByUsername } from "@/features/profile/services/get-profile-by-username";
import { getProfileFollowListService } from "@/features/profile/services/follow-user";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      username: string;
    }>;
  },
) {
  const { username } = await params;
  const kind = request.nextUrl.searchParams.get("kind");

  if (kind !== "followers" && kind !== "following") {
    return NextResponse.json(
      { error: "Invalid follow list." },
      { status: 400 },
    );
  }

  const profile = await getProfileByUsername(username);

  if (!profile) {
    return NextResponse.json(
      { error: "Profile not found." },
      { status: 404 },
    );
  }

  const session = await auth();
  const result = await getProfileFollowListService({
    userId: profile.id,
    kind,
    cursor: request.nextUrl.searchParams.get("cursor") ?? undefined,
    viewerUserId: session?.user?.id ?? null,
  });

  return NextResponse.json(result);
}