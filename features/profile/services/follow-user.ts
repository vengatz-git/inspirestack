// features/profile/services/follow-user.ts
import { and, desc, eq, inArray, lt, or } from "drizzle-orm";

import { db } from "@/db";
import { notifications, userFollows, users } from "@/db/schema";

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
  return db.transaction(async (tx) => {
    const [follow] = await tx
      .delete(userFollows)
      .where(
        and(
          eq(userFollows.followerId, followerId),
          eq(userFollows.followedId, followedId),
        ),
      )
      .returning({ followerId: userFollows.followerId });

    const deletedNotifications = await tx
      .delete(notifications)
      .where(
        and(
          eq(notifications.actorId, followerId),
          eq(notifications.recipientId, followedId),
          eq(notifications.type, "FOLLOW"),
        ),
      )
      .returning({
        id: notifications.id,
        recipientId: notifications.recipientId,
      });

    return {
      unfollowed: Boolean(follow),
      deletedNotifications,
    };
  });
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
  viewerUserId,
}: {
  userId: string;
  kind: "followers" | "following";
  cursor?: string;
  limit?: number;
  viewerUserId?: string | null;
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
  const profiles = pageRows.map(
    ({ createdAt: _createdAt, ...profile }) => profile,
  );
  const followedUserIds = new Set<string>();

  if (viewerUserId && profiles.length > 0) {
    const follows = await db
      .select({ followedId: userFollows.followedId })
      .from(userFollows)
      .where(
        and(
          eq(userFollows.followerId, viewerUserId),
          inArray(
            userFollows.followedId,
            profiles.map((profile) => profile.id),
          ),
        ),
      );

    for (const follow of follows) {
      followedUserIds.add(follow.followedId);
    }
  }

  return {
    users: profiles.map((profile) => ({
      ...profile,
      isFollowing: followedUserIds.has(profile.id),
    })),
    nextCursor: hasMore
      ? pageRows[pageRows.length - 1]?.id ?? null
      : null,
  };
}