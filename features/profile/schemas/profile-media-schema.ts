import { z } from "zod";

export const profileMediaSchema = z.object({
  image: z.instanceof(File, {
    message: "Please select an image.",
  }),
});

export type ProfileMediaInput = z.infer<typeof profileMediaSchema>;