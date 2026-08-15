import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function getGoogleImageService(
  userId: string,
) {
  const [profile] = await db
    .select({
      username: users.username,
      googleImage: users.googleImage,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return profile;
}