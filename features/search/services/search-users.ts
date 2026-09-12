import { asc, ilike, or } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

import type { SearchUser } from "../types/search";

interface SearchUsersOptions {
  query: string;
  limit?: number;
}

export async function searchUsers({
  query,
  limit = 10,
}: SearchUsersOptions): Promise<SearchUser[]> {
  const trimmed = query.trim();
  const normalized = trimmed.replace(/^@/, "");

  if (!normalized) {
    return [];
  }

  const term = `%${normalized}%`;

  const rows = await db
    .select({
      id: users.id,
      username: users.username,
      displayName: users.displayName,
      image: users.image,
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
    .limit(limit);

  return rows.filter(
    (user): user is SearchUser =>
      user.username !== null,
  );
}