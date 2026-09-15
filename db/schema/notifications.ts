import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { pins } from "./pins";
import { comments } from "./comments";

export const notificationTypeEnum = pgEnum(
  "notification_type",
  ["COMMENT", "REPLY", "SAVE", "LIKE"],
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    recipientId: uuid("recipient_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    actorId: uuid("actor_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    type: notificationTypeEnum("type").notNull(),

    pinId: uuid("pin_id").references(() => pins.id, {
      onDelete: "cascade",
    }),

    commentId: uuid("comment_id").references(
      () => comments.id,
      {
        onDelete: "cascade",
      },
    ),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    readAt: timestamp("read_at", {
      withTimezone: true,
    }),
  },
  (table) => ({
    recipientIdx: index(
      "notifications_recipient_idx",
    ).on(table.recipientId),

    recipientCreatedAtIdx: index(
      "notifications_recipient_created_at_idx",
    ).on(table.recipientId, table.createdAt),

    recipientReadAtIdx: index(
      "notifications_recipient_read_at_idx",
    ).on(table.recipientId, table.readAt),
  }),
);

export const notificationsRelations = relations(
  notifications,
  ({ one }) => ({
    recipient: one(users, {
      fields: [notifications.recipientId],
      references: [users.id],
      relationName: "notification_recipient",
    }),

    actor: one(users, {
      fields: [notifications.actorId],
      references: [users.id],
      relationName: "notification_actor",
    }),

    pin: one(pins, {
      fields: [notifications.pinId],
      references: [pins.id],
    }),

    comment: one(comments, {
      fields: [notifications.commentId],
      references: [comments.id],
    }),
  }),
);

export type Notification =
  typeof notifications.$inferSelect;

export type NewNotification =
  typeof notifications.$inferInsert;