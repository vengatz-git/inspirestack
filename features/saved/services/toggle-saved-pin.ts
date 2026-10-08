import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { savedPins } from "@/db/schema";

export async function toggleSavedPinService(
  userId: string,
  pinId: string,
) {
  return db.transaction(async (tx) => {
    const existing = await tx.query.savedPins.findFirst({
      where: and(
        eq(savedPins.userId, userId),
        eq(savedPins.pinId, pinId),
      ),
    });

    if (existing) {
      return {
        saved: true,
        isNew: false,
      };
    }

    const [saved] = await tx
      .insert(savedPins)
      .values({
        userId,
        pinId,
      })
      .onConflictDoNothing()
      .returning();

    return {
      saved: true,
      isNew: Boolean(saved),
    };
  });
}