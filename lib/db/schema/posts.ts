import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { profiles } from "./profiles";


export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),

  description: text("description"),

  imageUrl: text("image_url").notNull(),

  publicId: text("public_id").notNull(),

  width: integer("width").notNull(),

  height: integer("height").notNull(),

  profileId: uuid("profile_id")
  .references(() => profiles.id, {
    onDelete: "cascade",
  })
  .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});