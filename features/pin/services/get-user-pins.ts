import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

export async function getUserPinsService(userId: string) {
  return db.query.pins.findMany({
    where: eq(pins.authorId, userId),
    orderBy: desc(pins.createdAt),
  });
}