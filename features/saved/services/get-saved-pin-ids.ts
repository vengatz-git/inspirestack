import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { savedPins } from "@/db/schema";

export async function getSavedPinIdsForPins(
  userId: string | null | undefined,
  pinIds: string[],
) {
  if (!userId || pinIds.length === 0) {
    return new Set<string>();
  }

  const rows = await db
    .select({
      pinId: savedPins.pinId,
    })
    .from(savedPins)
    .where(
      and(
        eq(savedPins.userId, userId),
        inArray(savedPins.pinId, pinIds),
      ),
    );

  return new Set(rows.map((row) => row.pinId));
}