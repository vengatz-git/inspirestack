import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),

  description: text("description"),

  imageUrl: text("image_url").notNull(),

  publicId: text("public_id").notNull(),

  authorId: text("author_id").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});