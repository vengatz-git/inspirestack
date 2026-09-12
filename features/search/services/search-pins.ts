import { and, desc, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db";
import {
  pinTags,
  pins,
  tags,
  topics,
} from "@/db/schema";

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
  const trimmed = query.trim();
  const normalized = trimmed.replace(/^#/, "");
  const term = `%${normalized}%`;

  const rows = await db
    .selectDistinct({ pin: pins })
    .from(pins)
    .leftJoin(
      topics,
      eq(pins.topicId, topics.id),
    )
    .leftJoin(
      pinTags,
      eq(pins.id, pinTags.pinId),
    )
    .leftJoin(
      tags,
      eq(pinTags.tagId, tags.id),
    )
    .where(
      and(
        eq(pins.visibility, "PUBLIC"),
        or(
          ilike(pins.title, term),
          ilike(pins.description, term),
          ilike(topics.name, term),
          ilike(topics.slug, term),
          ilike(tags.name, term),
        ),
      ),
    )
    .orderBy(desc(pins.createdAt))
    .limit(limit);

  return rows.map(({ pin }) => mapPinToCard(pin));
}