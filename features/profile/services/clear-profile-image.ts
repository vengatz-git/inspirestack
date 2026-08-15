import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

import type { ProfileImageType } from "./update-profile-image";

export async function clearProfileImageService(
  userId: string,
  type: ProfileImageType,
) {
  const [profile] = await db
    .update(users)
    .set({
      ...(type === "avatar"
        ? {
            image: null,
            imagePublicId: null,
          }
        : {
            bannerImage: null,
            bannerImagePublicId: null,
          }),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning({
      username: users.username,
    });

  return profile;
}