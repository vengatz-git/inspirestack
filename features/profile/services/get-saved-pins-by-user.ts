import {
  and,
  eq,
  inArray,
  or,
} from "drizzle-orm";

import { db } from "@/db";
import {
  boardPins,
  boards,
  pins,
  savedPins,
  users,
} from "@/db/schema";

import type { ProfilePinCardData } from "../types/profile-pin-card";

interface GetSavedPinsByUserOptions {
  userId: string;
  includePrivate?: boolean;
  limit?: number;
  cursor?: string;
}

interface GetSavedPinsByUserResult {
  pins: ProfilePinCardData[];
  nextCursor: string | null;
}

type SavedPinMeta = {
  pinId: string;
  savedAt: Date;
  isDirectSave: boolean;
  isBoardSave: boolean;
};

export async function getSavedPinsByUserService({
  userId,
  includePrivate = false,
  limit = 24,
  cursor,
}: GetSavedPinsByUserOptions): Promise<GetSavedPinsByUserResult> {
  const pinVisibilityCondition = includePrivate
    ? or(
        eq(pins.visibility, "PUBLIC"),
        eq(pins.authorId, userId),
      )
    : eq(pins.visibility, "PUBLIC");

  const directSavedPins = await db
    .select({
      pinId: savedPins.pinId,
      savedAt: savedPins.createdAt,
    })
    .from(savedPins)
    .innerJoin(
      pins,
      eq(savedPins.pinId, pins.id),
    )
    .where(
      and(
        eq(savedPins.userId, userId),
        pinVisibilityCondition,
      ),
    );

  const boardSavedPins = await db
    .select({
      pinId: boardPins.pinId,
      savedAt: boardPins.createdAt,
    })
    .from(boardPins)
    .innerJoin(
      boards,
      eq(boardPins.boardId, boards.id),
    )
    .innerJoin(
      pins,
      eq(boardPins.pinId, pins.id),
    )
    .where(
      and(
        eq(boards.ownerId, userId),
        includePrivate
          ? undefined
          : eq(boards.visibility, "PUBLIC"),
        pinVisibilityCondition,
      ),
    );

  const savedPinMetaById = new Map<
    string,
    SavedPinMeta
  >();

  function addSavedPin(
    pinId: string,
    savedAt: Date,
    source: "direct" | "board",
  ) {
    const existing = savedPinMetaById.get(pinId);

    savedPinMetaById.set(pinId, {
      pinId,
      savedAt:
        !existing || savedAt > existing.savedAt
          ? savedAt
          : existing.savedAt,
      isDirectSave:
        existing?.isDirectSave === true ||
        source === "direct",
      isBoardSave:
        existing?.isBoardSave === true ||
        source === "board",
    });
  }

  for (const savedPin of directSavedPins) {
    addSavedPin(
      savedPin.pinId,
      savedPin.savedAt,
      "direct",
    );
  }

  for (const savedPin of boardSavedPins) {
    addSavedPin(
      savedPin.pinId,
      savedPin.savedAt,
      "board",
    );
  }

  const allSavedPins = Array.from(
    savedPinMetaById.values(),
  ).sort((left, right) => {
    const timeDifference =
      right.savedAt.getTime() - left.savedAt.getTime();

    if (timeDifference !== 0) {
      return timeDifference;
    }

    return right.pinId.localeCompare(left.pinId);
  });

  const cursorIndex = cursor
    ? allSavedPins.findIndex(
        (savedPin) => savedPin.pinId === cursor,
      )
    : -1;

  const visibleSavedPins =
    cursorIndex >= 0
      ? allSavedPins.slice(cursorIndex + 1)
      : allSavedPins;

  const pageWithExtra = visibleSavedPins.slice(
    0,
    limit + 1,
  );

  const hasMore = pageWithExtra.length > limit;

  const pageSavedPins = hasMore
    ? pageWithExtra.slice(0, limit)
    : pageWithExtra;

  if (pageSavedPins.length === 0) {
    return {
      pins: [],
      nextCursor: null,
    };
  }

  const pinIds = pageSavedPins.map(
    (savedPin) => savedPin.pinId,
  );

  const result = await db
    .select({
      pin: pins,
      author: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        image: users.image,
      },
    })
    .from(pins)
    .innerJoin(users, eq(pins.authorId, users.id))
    .where(inArray(pins.id, pinIds));

  const resultByPinId = new Map(
    result.map((item) => [item.pin.id, item]),
  );

  const profilePins = pageSavedPins.flatMap(
    (savedPin) => {
      const resultItem = resultByPinId.get(
        savedPin.pinId,
      );

      if (!resultItem) {
        return [];
      }

      const { pin, author } = resultItem;

      return [
        {
          id: pin.id,
          title: pin.title,
          description: pin.description,
          imageUrl: pin.imageUrl,
          imageWidth: pin.imageWidth,
          imageHeight: pin.imageHeight,
          altText: pin.title,

          author: {
            id: author.id,
            username: author.username,
            displayName: author.displayName,
            image: author.image,
          },

          isOwner: pin.authorId === userId,
          isSaved: true,
          isDirectSave: savedPin.isDirectSave,
          isBoardSave: savedPin.isBoardSave,
        },
      ];
    },
  );

  const nextCursor = hasMore
    ? pageSavedPins[pageSavedPins.length - 1]?.pinId ??
      null
    : null;

  return {
    pins: profilePins,
    nextCursor,
  };
}