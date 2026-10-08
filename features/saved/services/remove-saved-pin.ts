import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { savedPins } from "@/db/schema";

export async function removeSavedPinService(
  userId: string,
  pinId: string,
) {
  const removed = await db
    .delete(savedPins)
    .where(
      and(
        eq(savedPins.userId, userId),
        eq(savedPins.pinId, pinId),
      ),
    )
    .returning({
      pinId: savedPins.pinId,
    });

  return removed.length > 0;
}