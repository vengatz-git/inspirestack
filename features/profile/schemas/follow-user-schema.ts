import { z } from "zod";

export const followUserSchema = z.object({
  userId: z.string().uuid(),
});