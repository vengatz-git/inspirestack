import { relations } from "drizzle-orm";

import { posts } from "./schema/posts";
import { profiles } from "./schema/profiles";
import { boards, boardPins } from "./schema/boards";

export const profilesRelations = relations(profiles, ({ many }) => ({
  posts: many(posts),
  boards: many(boards),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [posts.profileId],
    references: [profiles.id],
  }),

  boardPins: many(boardPins),
}));

export const boardsRelations = relations(
  boards,
  ({ one, many }) => ({
    profile: one(profiles, {
      fields: [boards.profileId],
      references: [profiles.id],
    }),

    boardPins: many(boardPins),
  })
);

export const boardPinsRelations = relations(
  boardPins,
  ({ one }) => ({
    board: one(boards, {
      fields: [boardPins.boardId],
      references: [boards.id],
    }),

    post: one(posts, {
      fields: [boardPins.postId],
      references: [posts.id],
    }),
  })
);