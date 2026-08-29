import {
  index,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { pins } from "./pins";

export const tags = pgTable(
  "tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", {
      length: 50,
    }).notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    nameIdx: index("tags_name_idx").on(table.name),
  }),
);

export const pinTags = pgTable(
  "pin_tags",
  {
    pinId: uuid("pin_id")
      .notNull()
      .references(() => pins.id, {
        onDelete: "cascade",
      }),

    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, {
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
      columns: [table.pinId, table.tagId],
    }),

    pinIdx: index("pin_tags_pin_idx").on(table.pinId),

    tagIdx: index("pin_tags_tag_idx").on(table.tagId),
  }),
);

export const tagsRelations = relations(
  tags,
  ({ many }) => ({
    pinTags: many(pinTags),
  }),
);

export const pinTagsRelations = relations(
  pinTags,
  ({ one }) => ({
    pin: one(pins, {
      fields: [pinTags.pinId],
      references: [pins.id],
    }),

    tag: one(tags, {
      fields: [pinTags.tagId],
      references: [tags.id],
    }),
  }),
);

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;

export type PinTag = typeof pinTags.$inferSelect;
export type NewPinTag = typeof pinTags.$inferInsert;