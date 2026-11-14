import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

import type { UserSettings } from "../schemas/user-settings-schema";

export async function updateUserSettingsService(
  userId: string,
  settings: UserSettings,
) {
  await db
    .update(users)
    .set({
      ...settings,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}