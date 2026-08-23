import {
  and,
  desc,
  eq,
  ne,
  notInArray,
} from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import { mapPinToCard } from "../lib/map-pin-card";
import type { PinCardData } from "../types/pin-card";
import type { GetRelatedPinsOptions } from "../types/related-pins";

export async function getRelatedPinsService({
  pinId,
  limit = 20,
  excludeAuthorId,
}: GetRelatedPinsOptions): Promise<PinCardData[]> {
  /*
   * Get the current Pin so we know which topic
   * should be preferred for discovery.
   */
  const currentPin = await db.query.pins.findFirst({
    where: eq(pins.id, pinId),
    columns: {
      topicId: true,
    },
  });

  if (!currentPin) {
    return [];
  }

  /*
   * First preference:
   *
   * Public Pins from the same topic.
   *
   * By default, the current author's Pins are allowed.
   * A caller can optionally exclude an author for contexts
   * such as "Explore More" on a profile Pin page.
   */
  const relatedPins = await db.query.pins.findMany({
    where: and(
      ne(pins.id, pinId),
      eq(pins.topicId, currentPin.topicId),
      eq(pins.visibility, "PUBLIC"),

      ...(excludeAuthorId
        ? [ne(pins.authorId, excludeAuthorId)]
        : []),
    ),

    orderBy: desc(pins.createdAt),

    limit,
  });

  /*
   * If there aren't enough Pins in the same topic,
   * fill the remaining slots with recent PUBLIC Pins.
   */
  if (relatedPins.length < limit) {
    const existingIds = relatedPins.map((pin) => pin.id);

    const fallbackPins = await db.query.pins.findMany({
      where: and(
        ne(pins.id, pinId),
        eq(pins.visibility, "PUBLIC"),

        ...(excludeAuthorId
          ? [ne(pins.authorId, excludeAuthorId)]
          : []),

        ...(existingIds.length > 0
          ? [notInArray(pins.id, existingIds)]
          : []),
      ),

      orderBy: desc(pins.createdAt),

      limit: limit - relatedPins.length,
    });

    relatedPins.push(...fallbackPins);
  }

  return relatedPins.map(mapPinToCard);
}