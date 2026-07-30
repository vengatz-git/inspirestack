import { count, eq } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import type { ProfileStats } from "../types/profile-stats";

export async function getProfileStatsService(
  userId: string,
): Promise<ProfileStats> {
  const [{ posts }] = await db
    .select({
      posts: count(),
    })
    .from(pins)
    .where(eq(pins.authorId, userId));

  return {
    posts,
    followers: 0,
    following: 0,
  };
}