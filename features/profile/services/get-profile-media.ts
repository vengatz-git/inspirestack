import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

import type { ProfileImageType } from "./update-profile-image";

export async function getProfileMediaService(
  userId: string,
  type: ProfileImageType,
) {
  const [profile] = await db
    .select({
      username: users.username,
      publicId:
        type === "avatar"
          ? users.imagePublicId
          : users.bannerImagePublicId,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return profile;
}