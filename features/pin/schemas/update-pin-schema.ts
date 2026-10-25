import { z } from "zod";

export const updatePinSchema = z.object({
  pinId: z.uuid(),

  title: z
    .string()
    .trim()
    .max(120, "Title cannot exceed 120 characters.")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),

  destinationUrl: z
    .string()
    .trim()
    .max(2048, "Link cannot exceed 2048 characters.")
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),

  topicId: z.uuid("Please select a valid topic."),

  visibility: z.enum(["PUBLIC", "PRIVATE"]),

  tags: z.array(z.string()).max(10),
});

export type UpdatePinInput = z.infer<typeof updatePinSchema>;