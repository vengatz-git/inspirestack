import { and, desc, eq, lt, or } from "drizzle-orm";

import { db } from "@/db";
import { userFollows, users } from "@/db/schema";

export async function followUserService(
  followerId: string,
  followedId: string,
) {
  const [follow] = await db
    .insert(userFollows)
    .values({ followerId, followedId })
    .onConflictDoNothing()
    .returning({ followerId: userFollows.followerId });

  return Boolean(follow);
}

export async function unfollowUserService(
  followerId: string,
  followedId: string,
) {
  const [follow] = await db
    .delete(userFollows)
    .where(
      and(
        eq(userFollows.followerId, followerId),
        eq(userFollows.followedId, followedId),
      ),
    )
    .returning({ followerId: userFollows.followerId });

  return Boolean(follow);
}

export async function getIsFollowingService(
  followerId: string,
  followedId: string,
) {
  const [follow] = await db
    .select({ followerId: userFollows.followerId })
    .from(userFollows)
    .where(
      and(
        eq(userFollows.followerId, followerId),
        eq(userFollows.followedId, followedId),
      ),
    )
    .limit(1);

  return Boolean(follow);
}

export async function getProfileFollowListService({
  userId,
  kind,
  cursor,
  limit = 30,
}: {
  userId: string;
  kind: "followers" | "following";
  cursor?: string;
  limit?: number;
}) {
  const edgeUserId =
    kind === "followers"
      ? userFollows.followedId
      : userFollows.followerId;
  const listedUserId =
    kind === "followers"
      ? userFollows.followerId
      : userFollows.followedId;
  const pageSize = Number.isFinite(limit)
    ? Math.max(1, Math.min(60, Math.floor(limit)))
    : 30;

  let cursorCondition;

  if (cursor) {
    const [cursorRow] = await db
      .select({
        userId: listedUserId,
        createdAt: userFollows.createdAt,
      })
      .from(userFollows)
      .where(
        and(
          eq(edgeUserId, userId),
          eq(listedUserId, cursor),
        ),
      )
      .limit(1);

    if (!cursorRow) {
      return { users: [], nextCursor: null };
    }

    cursorCondition = or(
      lt(userFollows.createdAt, cursorRow.createdAt),
      and(
        eq(userFollows.createdAt, cursorRow.createdAt),
        lt(listedUserId, cursorRow.userId),
      ),
    );
  }

  const rows = await db
    .select({
      id: users.id,
      username: users.username,
      displayName: users.displayName,
      image: users.image,
      createdAt: userFollows.createdAt,
    })
    .from(userFollows)
    .innerJoin(users, eq(users.id, listedUserId))
    .where(and(eq(edgeUserId, userId), cursorCondition))
    .orderBy(desc(userFollows.createdAt), desc(listedUserId))
    .limit(pageSize + 1);

  const hasMore = rows.length > pageSize;
  const pageRows = hasMore ? rows.slice(0, pageSize) : rows;

  return {
    users: pageRows.map(({ createdAt: _createdAt, ...profile }) => profile),
    nextCursor: hasMore
      ? pageRows[pageRows.length - 1]?.id ?? null
      : null,
  };
}