import {
  index,
  uuid,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "./auth"; // Adjust the import path based on your project structure

export const pinVisibilityEnum = pgEnum("pin_visibility", [
  "PUBLIC",
  "PRIVATE",
]);

export const pins = pgTable(
  "pins",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    title: varchar("title", {
      length: 120,
    }),

    description: text("description"),

    imageUrl: text("image_url").notNull(),

    imageWidth: integer("image_width").notNull(),

    imageHeight: integer("image_height").notNull(),

    altText: varchar("alt_text", {
      length: 200,
    }),

    visibility: pinVisibilityEnum("visibility")
      .notNull()
      .default("PUBLIC"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    authorIdx: index("pins_author_idx").on(table.authorId),

    createdAtIdx: index("pins_created_at_idx").on(table.createdAt),

    authorCreatedAtIdx: index("pins_author_created_at_idx").on(
      table.authorId,
      table.createdAt,
    ),
  }),
);

export const pinsRelations = relations(pins, ({ one }) => ({
  author: one(users, {
    fields: [pins.authorId],
    references: [users.id],
  }),
}));

export type Pin = typeof pins.$inferSelect;
export type NewPin = typeof pins.$inferInsert;