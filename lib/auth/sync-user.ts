import { auth, currentUser } from "@clerk/nextjs/server";

import {
  createProfile,
  getProfileByClerkId,
} from "@/lib/db/queries/profile";

function generateUsername(name: string, clerkId: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return `${base}_${clerkId.slice(-6)}`;
}

export async function syncUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const existingProfile = await getProfileByClerkId(userId);

  if (existingProfile) {
    return existingProfile;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  return createProfile({
    clerkUserId: user.id,
    username: generateUsername(
      user.username ??
        user.firstName ??
        "user",
      user.id
    ),
    displayName:
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
      "Anonymous",
    imageUrl: user.imageUrl,
  });
}