import { and, count, eq } from "drizzle-orm";

import { db } from "@/db";
import { pins, userFollows } from "@/db/schema";

import type { ProfileStats } from "../types/profile-stats";

export async function getProfileStatsService(
  userId: string,
  viewerUserId?: string | null,
): Promise<ProfileStats> {
  const [postRows, followerRows, followingRows] = await Promise.all([
    db
      .select({ posts: count() })
      .from(pins)
      .where(
        and(
          eq(pins.authorId, userId),
          ...(viewerUserId === userId
            ? []
            : [eq(pins.visibility, "PUBLIC")]),
        ),
      ),
    db
      .select({ followers: count() })
      .from(userFollows)
      .where(eq(userFollows.followedId, userId)),
    db
      .select({ following: count() })
      .from(userFollows)
      .where(eq(userFollows.followerId, userId)),
  ]);

  return {
    posts: postRows[0]?.posts ?? 0,
    followers: followerRows[0]?.followers ?? 0,
    following: followingRows[0]?.following ?? 0,
  };
}