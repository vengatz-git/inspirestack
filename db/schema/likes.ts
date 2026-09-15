import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { pins } from "./pins";

export const pinLikes = pgTable(
  "pin_likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    pinId: uuid("pin_id")
      .notNull()
      .references(() => pins.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pinUserUnique: unique("pin_likes_pin_user_unique").on(
      table.pinId,
      table.userId,
    ),

    pinIdx: index("pin_likes_pin_idx").on(table.pinId),

    userIdx: index("pin_likes_user_idx").on(table.userId),
  }),
);

export const pinLikesRelations = relations(
  pinLikes,
  ({ one }) => ({
    pin: one(pins, {
      fields: [pinLikes.pinId],
      references: [pins.id],
    }),

    user: one(users, {
      fields: [pinLikes.userId],
      references: [users.id],
    }),
  }),
);

export type PinLike = typeof pinLikes.$inferSelect;
export type NewPinLike = typeof pinLikes.$inferInsert;