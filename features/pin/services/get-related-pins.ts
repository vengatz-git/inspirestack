import { desc, ne } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import { mapPinToCard } from "../lib/map-pin-card";
import type { PinCardData } from "../types/pin-card";
import type { GetRelatedPinsOptions } from "../types/related-pins";

export async function getRelatedPinsService({
  pinId,
  limit = 20,
}: GetRelatedPinsOptions): Promise<PinCardData[]> {
  const relatedPins = await db.query.pins.findMany({
    where: ne(pins.id, pinId),
    orderBy: desc(pins.createdAt),
    limit,

    // Future recommendation logic can be layered in here, e.g.:
    // - category similarity: match against the source pin's category
    // - shared tags: join against a tags / pin_tags table
    // - user interests: factor in the viewing user's interest profile
    // - saved pins: boost pins similar to what the user has saved
    // - embeddings / vector search: nearest-neighbor search on pin embeddings
  });

  return relatedPins.map(mapPinToCard);
}