import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { comments } from "./comments";
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

export const commentLikes = pgTable(
  "comment_likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    commentId: uuid("comment_id")
      .notNull()
      .references(() => comments.id, {
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
    commentUserUnique: unique("comment_likes_comment_user_unique").on(
      table.commentId,
      table.userId,
    ),

    commentIdx: index("comment_likes_comment_idx").on(table.commentId),

    userIdx: index("comment_likes_user_idx").on(table.userId),
  }),
);

export const commentLikesRelations = relations(
  commentLikes,
  ({ one }) => ({
    comment: one(comments, {
      fields: [commentLikes.commentId],
      references: [comments.id],
    }),

    user: one(users, {
      fields: [commentLikes.userId],
      references: [users.id],
    }),
  }),
);

export type PinLike = typeof pinLikes.$inferSelect;
export type NewPinLike = typeof pinLikes.$inferInsert;

export type CommentLike = typeof commentLikes.$inferSelect;
export type NewCommentLike = typeof commentLikes.$inferInsert;
