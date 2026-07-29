import { z } from "zod";

export const profileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .max(50, "Display name must be 50 characters or fewer.")
    .optional(),

  bio: z
    .string()
    .trim()
    .max(160, "Bio must be 160 characters or fewer.")
    .optional(),

  website: z
    .string()
    .trim()
    .url("Please enter a valid website URL.")
    .or(z.literal(""))
    .optional(),

  location: z
    .string()
    .trim()
    .max(50, "Location must be 50 characters or fewer.")
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof profileSchema>;