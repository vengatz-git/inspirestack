import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

import type { Profile } from "../types/profile";

export async function getProfileByUsername(
  username: string,
): Promise<Profile | null> {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      id: true,
      username: true,
      displayName: true,
      image: true,
      bio: true,
      website: true,
      location: true,
      bannerImage: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user || !user.username) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    image: user.image,
    bio: user.bio,
    website: user.website,
    location: user.location,
    bannerImage: user.bannerImage,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}