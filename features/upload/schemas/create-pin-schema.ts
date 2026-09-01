import { z } from "zod";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;

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
    })
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      "Image must be 20 MB or smaller.",
    )
    .refine(
      (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      "Only PNG, JPG, and WEBP images are supported.",
    ),

  topicId: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Please select a topic."
          : "Please select a valid topic.",
    })
    .uuid("Please select a valid topic."),
});

export const createPinFormSchema = createPinSchema.extend({
  tags: z.array(z.string()).max(10),
  tagInput: z.string(),
});

export type CreatePinSchema = z.infer<typeof createPinSchema>;

export type CreatePinFormValues = z.infer<typeof createPinFormSchema>;
