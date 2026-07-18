import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),

  clerkUserId: text("clerk_user_id")
    .notNull()
    .unique(),

  username: text("username")
    .notNull()
    .unique(),

    
  displayName: text("display_name").notNull(),
  
  imageUrl: text("image_url"),

  bio: text("bio"),

  website: text("website"),

  location: text("location"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});