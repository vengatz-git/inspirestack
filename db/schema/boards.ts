import {
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "./auth";
import { pins } from "./pins";

export const boardVisibilityEnum = pgEnum("board_visibility", [
  "PUBLIC",
  "PRIVATE",
]);

export const boards = pgTable(
  "boards",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    description: text("description"),

    coverPinId: uuid("cover_pin_id").references(() => pins.id, {
      onDelete: "set null",
    }),

    visibility: boardVisibilityEnum("visibility").notNull().default("PUBLIC"),

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

    lastUsedAt: timestamp("last_used_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    ownerIdx: index("boards_owner_idx").on(table.ownerId),

    createdAtIdx: index("boards_created_at_idx").on(table.createdAt),

    lastUsedAtIdx: index("boards_last_used_at_idx").on(table.lastUsedAt),
  }),
);

export const boardPins = pgTable(
  "board_pins",
  {
    boardId: uuid("board_id")
      .notNull()
      .references(() => boards.id, {
        onDelete: "cascade",
      }),

    pinId: uuid("pin_id")
      .notNull()
      .references(() => pins.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.boardId, table.pinId],
    }),

    boardIdx: index("board_pins_board_idx").on(table.boardId),

    pinIdx: index("board_pins_pin_idx").on(table.pinId),
  }),
);

export const boardsRelations = relations(boards, ({ one, many }) => ({
  owner: one(users, {
    fields: [boards.ownerId],
    references: [users.id],
  }),

  coverPin: one(pins, {
    fields: [boards.coverPinId],
    references: [pins.id],
  }),

  boardPins: many(boardPins),
}));

export const boardPinsRelations = relations(boardPins, ({ one }) => ({
  board: one(boards, {
    fields: [boardPins.boardId],
    references: [boards.id],
  }),

  pin: one(pins, {
    fields: [boardPins.pinId],
    references: [pins.id],
  }),
}));

export type Board = typeof boards.$inferSelect;
export type NewBoard = typeof boards.$inferInsert;

export type BoardPin = typeof boardPins.$inferSelect;

export type NewBoardPin = typeof boardPins.$inferInsert;
