import { z } from "zod";

export const removeSavedPinSchema = z.object({
  pinId: z.uuid(),
});