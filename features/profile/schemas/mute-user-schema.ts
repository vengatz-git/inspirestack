import { z } from "zod";

export const muteUserSchema = z.object({
  userId: z.string().uuid(),
  muted: z.boolean(),
});
