import { z } from "zod";

export const createBoardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Board name is required.")
    .max(100, "Board name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("")),

  visibility: z.enum([
    "PUBLIC",
    "PRIVATE",
  ]),
});

export type CreateBoardInput =
  z.infer<typeof createBoardSchema>;