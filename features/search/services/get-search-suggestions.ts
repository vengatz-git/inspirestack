import { and, asc, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db";
import {
  pinTags,
  pins,
  tags,
  topics,
  users,
} from "@/db/schema";

export interface GetSearchSuggestionsOptions {
  query: string;
  limit?: number;
}

export async function getSearchSuggestions({
  query,
  limit = 8,
}: GetSearchSuggestionsOptions): Promise<string[]> {
  const trimmed = query.trim();
  const normalized = trimmed.replace(/^[@#]/, "");

  if (!normalized) {
    return [];
  }

  const term = `%${normalized}%`;

  const [userRows, pinRows] = await Promise.all([
    db
      .select({
        username: users.username,
        displayName: users.displayName,
      })
      .from(users)
      .where(
        or(
          ilike(users.username, term),
          ilike(users.displayName, term),
          ilike(users.name, term),
        ),
      )
      .orderBy(asc(users.username))
      .limit(limit),

    db
      .selectDistinct({
        title: pins.title,
        topic: topics.name,
        tag: tags.name,
      })
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
      .orderBy(asc(pins.title))
      .limit(limit),
  ]);

  const suggestions = [
    ...userRows.flatMap((user) => [
      user.displayName,
      user.username,
    ]),
    ...pinRows.flatMap((pin) => [
      pin.title,
      pin.topic,
      pin.tag,
    ]),
  ];

  return Array.from(
    new Set(
      suggestions.filter(
        (item): item is string =>
          typeof item === "string" &&
          item.trim() !== "",
      ),
    ),
  ).slice(0, limit);
}