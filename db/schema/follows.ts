import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";

export const userFollows = pgTable(
  "user_follows",
  {
    followerId: uuid("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followedId: uuid("followed_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.followerId, table.followedId],
    }),
    notSelf: check(
      "user_follows_not_self",
      sql`${table.followerId} <> ${table.followedId}`,
    ),
    followerCreatedAtIdx: index(
      "user_follows_follower_created_at_idx",
    ).on(table.followerId, table.createdAt),
    followedCreatedAtIdx: index(
      "user_follows_followed_created_at_idx",
    ).on(table.followedId, table.createdAt),
  }),
);

export const userFollowsRelations = relations(
  userFollows,
  ({ one }) => ({
    follower: one(users, {
      fields: [userFollows.followerId],
      references: [users.id],
      relationName: "follower_user",
    }),
    followed: one(users, {
      fields: [userFollows.followedId],
      references: [users.id],
      relationName: "followed_user",
    }),
  }),
);