import {
  boolean,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { posts } from "./posts";
import { profiles } from "./profiles";

export const boards = pgTable("boards", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),

  description: text("description"),

  isPrivate: boolean("is_private")
    .notNull()
    .default(false),

  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .$onUpdate(() => new Date())
    .defaultNow()
    .notNull(),
});

export const boardPins = pgTable(
  "board_pins",
  {
    boardId: uuid("board_id")
      .notNull()
      .references(() => boards.id, {
        onDelete: "cascade",
      }),

    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, {
        onDelete: "cascade",
      }),

    savedAt: timestamp("saved_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.boardId, table.postId],
    }),

    boardIdx: index("board_pins_board_idx").on(table.boardId),

    postIdx: index("board_pins_post_idx").on(table.postId),
  })
);