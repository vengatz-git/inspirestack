import { and, eq, or } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

export async function getPinByIdService(
  id: string,
  viewerUserId?: string | null,
) {
  const visibilityCondition = viewerUserId
    ? or(
        eq(pins.visibility, "PUBLIC"),
        and(
          eq(pins.visibility, "PRIVATE"),
          eq(pins.authorId, viewerUserId),
        ),
      )
    : eq(pins.visibility, "PUBLIC");

  return db.query.pins.findFirst({
    where: and(eq(pins.id, id), visibilityCondition),
    with: {
      author: true,
      topic: true,
      pinTags: {
        with: {
          tag: true,
        },
      },
    },
  });
}