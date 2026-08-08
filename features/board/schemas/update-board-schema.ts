import { z } from "zod";

export const updateBoardSchema = z.object({
  boardId: z.uuid(),

  name: z
    .string()
    .trim()
    .min(1, "Board name is required.")
    .max(100, "Board name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  visibility: z.enum(["PUBLIC", "PRIVATE"]),
});

export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;