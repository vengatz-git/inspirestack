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

export const userMutes = pgTable(
  "user_mutes",
  {
    muterId: uuid("muter_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mutedUserId: uuid("muted_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.muterId, table.mutedUserId] }),
    notSelf: check(
      "user_mutes_not_self",
      sql`${table.muterId} <> ${table.mutedUserId}`,
    ),
    mutedUserIdx: index("user_mutes_muted_user_id_idx").on(table.mutedUserId),
  }),
);

export const userMutesRelations = relations(userMutes, ({ one }) => ({
  muter: one(users, {
    fields: [userMutes.muterId],
    references: [users.id],
    relationName: "muter_user",
  }),
  mutedUser: one(users, {
    fields: [userMutes.mutedUserId],
    references: [users.id],
    relationName: "muted_user",
  }),
}));
