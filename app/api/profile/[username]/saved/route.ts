import { NextRequest, NextResponse } from "next/server";

import { getProfileByUsername } from "@/features/profile/services/get-profile-by-username";
import { getSavedPinsByUserService } from "@/features/profile/services/get-saved-pins-by-user";

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

  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor") ?? undefined;

  const profile = await getProfileByUsername(username);

  if (!profile) {
    return NextResponse.json(
      { error: "Profile not found." },
      { status: 404 },
    );
  }

  const result = await getSavedPinsByUserService({
    userId: profile.id,
    cursor,
  });

  return NextResponse.json(result);
}