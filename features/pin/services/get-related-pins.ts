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
}: GetRelatedPinsOptions): Promise<PinCardData[]> {
  /*
   * Get the current Pin so we know:
   *
   * - who created it
   * - which topic it belongs to
   */
  const currentPin = await db.query.pins.findFirst({
    where: eq(pins.id, pinId),
    columns: {
      authorId: true,
      topicId: true,
    },
  });

  if (!currentPin) {
    return [];
  }

  /*
   * First preference:
   *
   * Public Pins from OTHER users that belong
   * to the same topic.
   */
  const relatedPins = await db.query.pins.findMany({
    where: and(
      ne(pins.id, pinId),
      ne(pins.authorId, currentPin.authorId),
      eq(pins.topicId, currentPin.topicId),
      eq(pins.visibility, "PUBLIC"),
    ),

    orderBy: desc(pins.createdAt),

    limit,

    with: {
      author: {
        columns: {
          id: true,
          username: true,
        },
      },
    },
  });

  /*
   * If there aren't enough Pins in the same topic,
   * fill the remaining slots with recent PUBLIC Pins
   * from OTHER users.
   */
  if (relatedPins.length < limit) {
    const existingIds = relatedPins.map(
      (pin) => pin.id,
    );

    const fallbackPins =
      await db.query.pins.findMany({
        where: and(
          ne(pins.id, pinId),
          ne(
            pins.authorId,
            currentPin.authorId,
          ),
          eq(pins.visibility, "PUBLIC"),

          ...(existingIds.length > 0
            ? [
                notInArray(
                  pins.id,
                  existingIds,
                ),
              ]
            : []),
        ),

        orderBy: desc(pins.createdAt),

        limit: limit - relatedPins.length,

        with: {
          author: {
            columns: {
              id: true,
              username: true,
            },
          },
        },
      });

    relatedPins.push(...fallbackPins);
  }

  return relatedPins.map(mapPinToCard);
}