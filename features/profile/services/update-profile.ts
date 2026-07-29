import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

import type { UpdateProfileInput } from "../schemas/profile-schema";

export async function updateProfileService(
  userId: string,
  data: UpdateProfileInput,
) {
  const [profile] = await db
    .update(users)
    .set({
      displayName: data.displayName,
      bio: data.bio,
      website: data.website,
      location: data.location,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning({
      username: users.username,
    });

  return profile;
}