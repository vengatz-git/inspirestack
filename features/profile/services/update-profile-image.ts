import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export type ProfileImageType = "avatar" | "banner";

export async function updateProfileImageService(
  userId: string,
  type: ProfileImageType,
  imageUrl: string,
) {
  const [profile] = await db
    .update(users)
    .set({
      ...(type === "avatar"
        ? { image: imageUrl }
        : { bannerImage: imageUrl }),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning({
      username: users.username,
    });

  return profile;
}