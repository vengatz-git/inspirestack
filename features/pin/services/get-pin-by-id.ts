import { eq } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

export async function getPinByIdService(id: string) {
  return db.query.pins.findFirst({
    where: eq(pins.id, id),
    with: {
      author: true,
      topic: true,
    },
  });
}