import { z } from "zod";

export const likePinSchema = z.object({
  pinId: z.string().uuid(),
});

export const unlikePinSchema = z.object({
  pinId: z.string().uuid(),
});