import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "./auth";
import { topics } from "./topics";

export const drafts = pgTable(
  "drafts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    topicId: uuid("topic_id").references(() => topics.id, {
      onDelete: "restrict",
    }),

    title: varchar("title", {
      length: 120,
    }),

    description: text("description"),

    imageUrl: text("image_url").notNull(),

    imagePublicId: text("image_public_id").notNull(),

    imageWidth: integer("image_width").notNull(),

    imageHeight: integer("image_height").notNull(),

    tagNames: text("tag_names").array().notNull().default([]),

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
    authorIdx: index("drafts_author_idx").on(
      table.authorId,
    ),

    authorUpdatedAtIdx: index(
      "drafts_author_updated_at_idx",
    ).on(table.authorId, table.updatedAt),
  }),
);

export const draftsRelations = relations(
  drafts,
  ({ one }) => ({
    author: one(users, {
      fields: [drafts.authorId],
      references: [users.id],
    }),

    topic: one(topics, {
      fields: [drafts.topicId],
      references: [topics.id],
    }),
  }),
);

export type Draft = typeof drafts.$inferSelect;
export type NewDraft = typeof drafts.$inferInsert;