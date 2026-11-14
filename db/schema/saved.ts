import { relations } from "drizzle-orm";
import {
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
      .references(() => users.id, { onDelete: "cascade" }),
    pinId: uuid("pin_id")
      .notNull()
      .references(() => pins.id, { onDelete: "cascade" }),
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