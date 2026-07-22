import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { boardPins, boards } from "@/lib/db/schema/boards";
import { posts } from "../schema";

interface CreateBoardInput {
  title: string;
  description?: string;
  isPrivate?: boolean;
  profileId: string;
}

export async function createBoard({
  title,
  description,
  isPrivate = false,
  profileId,
}: CreateBoardInput) {
  const [board] = await db
    .insert(boards)
    .values({
      title,
      description,
      isPrivate,
      profileId,
    })
    .returning();

  return board;
}

interface GetBoardsByProfileIdOptions {
  profileId: string;
}

export async function getBoardsByProfileId({
  profileId,
}: GetBoardsByProfileIdOptions) {
  return db.query.boards.findMany({
    where: eq(boards.profileId, profileId),
    orderBy: desc(boards.createdAt),
  });
}

// ======================================================================

interface SavePinToBoardInput {
  boardId: string;
  postId: string;
}

export async function savePinToBoard({
  boardId,
  postId,
}: SavePinToBoardInput) {
  const [savedPin] = await db
    .insert(boardPins)
    .values({
      boardId,
      postId,
    })
    .returning();

  return savedPin;
}

// ======================================================================

interface RemovePinFromBoardInput {
  boardId: string;
  postId: string;
}

export async function removePinFromBoard({
  boardId,
  postId,
}: RemovePinFromBoardInput) {
  const [removedPin] = await db
    .delete(boardPins)
    .where(
      and(
        eq(boardPins.boardId, boardId),
        eq(boardPins.postId, postId)
      )
    )
    .returning();

  return removedPin;
}

// ======================================================================

interface IsPinSavedToBoardOptions {
  boardId: string;
  postId: string;
}

export async function isPinSavedToBoard({
  boardId,
  postId,
}: IsPinSavedToBoardOptions) {
  return db.query.boardPins.findFirst({
    where: and(
      eq(boardPins.boardId, boardId),
      eq(boardPins.postId, postId)
    ),
  });
}

// ================================================================================================

interface GetBoardByIdOptions {
  boardId: string;
}

export async function getBoardById({
  boardId,
}: GetBoardByIdOptions) {
  return db.query.boards.findFirst({
    where: eq(boards.id, boardId),
  });
}

// ================================================================================================

interface GetPostByIdOptions {
  postId: string;
}

export async function getPostById({
  postId,
}: GetPostByIdOptions) {
  return db.query.posts.findFirst({
    where: eq(posts.id, postId),
  });
}