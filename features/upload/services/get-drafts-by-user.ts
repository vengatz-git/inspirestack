import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { drafts } from "@/db/schema";

export async function getDraftsByUserService(
  authorId: string,
) {
  return db
    .select()
    .from(drafts)
    .where(eq(drafts.authorId, authorId))
    .orderBy(desc(drafts.updatedAt));
}