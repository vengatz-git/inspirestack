import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { pins } from "./pins";

export const topics = pgTable("topics", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", {
    length: 100,
  })
    .notNull()
    .unique(),

  slug: varchar("slug", {
    length: 100,
  })
    .notNull()
    .unique(),

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
});

export const topicsRelations = relations(
  topics,
  ({ many }) => ({
    pins: many(pins),
  }),
);

export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;