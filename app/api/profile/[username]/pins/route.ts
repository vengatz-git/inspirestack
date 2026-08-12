import { NextRequest, NextResponse } from "next/server";

import { getProfileByUsername } from "@/features/profile/services/get-profile-by-username";
import { getUserPinsService } from "@/features/pin/services/get-pins-by-user";

type ProfilePinsRouteProps = {
  params: Promise<{
    username: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: ProfilePinsRouteProps,
) {
  const { username } = await params;

  const searchParams = request.nextUrl.searchParams;

  const limit = Number(
    searchParams.get("limit") ?? 24,
  );

  const cursor =
    searchParams.get("cursor") ?? undefined;

  const profile =
    await getProfileByUsername(username);

  if (!profile) {
    return NextResponse.json(
      {
        message: "Profile not found.",
      },
      {
        status: 404,
      },
    );
  }

  const pins = await getUserPinsService({
    userId: profile.id,
    limit,
    cursor,
  });

  return NextResponse.json(pins);
}