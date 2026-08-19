import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

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

  const limit = Number(searchParams.get("limit") ?? 24);

  const cursor = searchParams.get("cursor") ?? undefined;

  const excludePinId = searchParams.get("excludePinId") ?? undefined;

  const profile = await getProfileByUsername(username);

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

  const session = await auth();

  const pins = await getUserPinsService({
    userId: profile.id,
    viewerUserId: session?.user?.id ?? null,
    limit,
    cursor,
    excludePinId,
  });

  return NextResponse.json(pins);
}
