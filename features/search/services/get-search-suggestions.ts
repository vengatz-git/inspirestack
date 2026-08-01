"use server";

import { and, asc, eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { pins } from "@/db/schema";

export interface GetSearchSuggestionsOptions {
  query: string;
  limit?: number;
}

export async function getSearchSuggestions({
  query,
  limit = 8,
}: GetSearchSuggestionsOptions): Promise<string[]> {
  const trimmed = query.trim();

  if (!trimmed) {
    return [];
  }

  const term = `%${trimmed}%`;

  const rows = await db
    .selectDistinct({ title: pins.title })
    .from(pins)
    .where(and(eq(pins.visibility, "PUBLIC"), ilike(pins.title, term)))
    .orderBy(asc(pins.title))
    .limit(limit);

  return rows
    .map((row) => row.title)
    .filter((title): title is string => title !== null);
}