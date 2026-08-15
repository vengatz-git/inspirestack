import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function restoreGoogleImageService(
  userId: string,
  googleImage: string,
) {
  const [profile] = await db
    .update(users)
    .set({
      image: googleImage,
      imagePublicId: null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning({
      username: users.username,
      image: users.image,
    });

  return profile;
}