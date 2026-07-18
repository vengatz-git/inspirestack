import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema/posts";
import { profiles } from "@/lib/db/schema/profiles";

export async function getProfileByClerkId(clerkUserId: string) {
  return db.query.profiles.findFirst({
    where: eq(profiles.clerkUserId, clerkUserId),
  });
}

export async function getProfileByUsername(username: string) {
  return db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });
}

export async function getProfilePosts(profileId: string) {
  return db.query.posts.findMany({
    where: eq(posts.profileId, profileId),
    with: {
      profile: true,
    },
    orderBy: desc(posts.createdAt),
  });
}

interface CreateProfileInput {
  clerkUserId: string;
  username: string;
  displayName: string;
  imageUrl?: string | null;
}

export async function createProfile({
  clerkUserId,
  username,
  displayName,
  imageUrl,
}: CreateProfileInput) {
  const [profile] = await db
    .insert(profiles)
    .values({
      clerkUserId,
      username,
      displayName,
      imageUrl,
    })
    .returning();

  return profile;
}