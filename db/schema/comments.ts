import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { pins } from "./pins";

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    pinId: uuid("pin_id")
      .notNull()
      .references(() => pins.id, {
        onDelete: "cascade",
      }),

    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    content: text("content").notNull(),

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
    pinIdx: index("comments_pin_idx").on(table.pinId),

    authorIdx: index("comments_author_idx").on(table.authorId),

    pinCreatedAtIdx: index("comments_pin_created_at_idx").on(
      table.pinId,
      table.createdAt,
    ),
  }),
);

export const commentsRelations = relations(
  comments,
  ({ one }) => ({
    pin: one(pins, {
      fields: [comments.pinId],
      references: [pins.id],
    }),

    author: one(users, {
      fields: [comments.authorId],
      references: [users.id],
    }),
  }),
);

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;