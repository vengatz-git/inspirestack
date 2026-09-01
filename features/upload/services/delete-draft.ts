import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { drafts } from "@/db/schema";

export async function deleteDraftService(
  draftId: string,
  authorId: string,
) {
  const [draft] = await db
    .delete(drafts)
    .where(
      and(
        eq(drafts.id, draftId),
        eq(drafts.authorId, authorId),
      ),
    )
    .returning();

  return draft ?? null;
}