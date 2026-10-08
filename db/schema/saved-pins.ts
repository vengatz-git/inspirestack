import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { pins } from "./pins";
import { users } from "./auth";

export const savedPins = pgTable(
  "saved_pins",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    pinId: uuid("pin_id")
      .notNull()
      .references(() => pins.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.pinId],
    }),

    userIdx: index("saved_pins_user_idx").on(table.userId),
    pinIdx: index("saved_pins_pin_idx").on(table.pinId),
  }),
);

export const savedPinsRelations = relations(
  savedPins,
  ({ one }) => ({
    user: one(users, {
      fields: [savedPins.userId],
      references: [users.id],
    }),

    pin: one(pins, {
      fields: [savedPins.pinId],
      references: [pins.id],
    }),
  }),
);

export type SavedPin = typeof savedPins.$inferSelect;
export type NewSavedPin = typeof savedPins.$inferInsert;