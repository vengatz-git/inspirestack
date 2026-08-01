import { z } from "zod";

export const createPinSchema = z.object({
  title: z
    .string()
    .trim()
    .max(120, "Title cannot exceed 120 characters.")
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional(),

  image: z
    .instanceof(File, {
      message: "Please select an image.",
    }),

  altText: z
    .string()
    .trim()
    .max(200, "Alt text cannot exceed 200 characters.")
    .optional(),

  topicId: z
  .string({
    error: (issue) =>
      issue.input === undefined
        ? "Please select a topic."
        : "Please select a valid topic.",
  })
  .uuid("Please select a valid topic."),
});
export type CreatePinSchema = z.infer<typeof createPinSchema>;