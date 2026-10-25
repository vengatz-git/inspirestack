import {
  and,
  desc,
  eq,
  ne,
  notInArray,
} from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

import { getPinLikeDataForPins } from "@/features/like/services/get-pin-like-data";

import { mapPinToCard } from "../lib/map-pin-card";
import type { PinCardData } from "../types/pin-card";
import type { GetRelatedPinsOptions } from "../types/related-pins";

export async function getRelatedPinsService({
  pinId,
  limit = 20,
  excludeAuthorId,
  viewerUserId,
}: GetRelatedPinsOptions): Promise<PinCardData[]> {
  const currentPin = await db.query.pins.findFirst({
    where: eq(pins.id, pinId),
    columns: {
      topicId: true,
    },
  });

  if (!currentPin) {
    return [];
  }

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

  const likeDataByPinId = await getPinLikeDataForPins(
    relatedPins.map((pin) => pin.id),
    viewerUserId,
  );

  return relatedPins.map((pin) => {
    const likeData = likeDataByPinId.get(pin.id);

    return {
      ...mapPinToCard(pin),
      likeCount: likeData?.likeCount ?? 0,
      isLiked: likeData?.isLiked ?? false,
    };
  });
}