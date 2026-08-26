import { z } from "zod";

export const createCommentSchema = z.object({
  pinId: z.string().uuid(),

  parentId: z.string().uuid().nullable().optional(),

  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(
      1000,
      "Comment must be 1000 characters or less.",
    ),
});