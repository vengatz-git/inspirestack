import { and, desc, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import { mapPinToCard } from "@/features/pin/lib/map-pin-card";
import type { PinCardData } from "@/features/pin/types/pin-card";

interface SearchPinsOptions {
  query: string;
  limit?: number;
}

export async function searchPins({
  query,
  limit = 30,
}: SearchPinsOptions): Promise<PinCardData[]> {
  const term = `%${query}%`;

  const results = await db.query.pins.findMany({
    where: and(
      eq(pins.visibility, "PUBLIC"),
      or(ilike(pins.title, term), ilike(pins.description, term)),
    ),

    orderBy: desc(pins.createdAt),

    limit,
  });

  return results.map(mapPinToCard);
}
