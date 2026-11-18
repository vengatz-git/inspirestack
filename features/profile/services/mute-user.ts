import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { userMutes } from "@/db/schema";

export async function getIsUserMutedService(
  muterId: string,
  mutedUserId: string,
) {
  const [mute] = await db
    .select({ muterId: userMutes.muterId })
    .from(userMutes)
    .where(
      and(
        eq(userMutes.muterId, muterId),
        eq(userMutes.mutedUserId, mutedUserId),
      ),
    )
    .limit(1);

  return Boolean(mute);
}

export async function setUserMutedService(
  muterId: string,
  mutedUserId: string,
  muted: boolean,
) {
  if (muted) {
    await db
      .insert(userMutes)
      .values({ muterId, mutedUserId })
      .onConflictDoNothing();
    return;
  }

  await db
    .delete(userMutes)
    .where(
      and(
        eq(userMutes.muterId, muterId),
        eq(userMutes.mutedUserId, mutedUserId),
      ),
    );
}
