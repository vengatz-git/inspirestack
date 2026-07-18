import { relations } from "drizzle-orm";

import { posts } from "./schema/posts";
import { profiles } from "./schema/profiles";

export const profilesRelations = relations(profiles, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  profile: one(profiles, {
    fields: [posts.profileId],
    references: [profiles.id],
  }),
}));