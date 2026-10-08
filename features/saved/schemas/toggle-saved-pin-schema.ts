import { z } from "zod";

export const toggleSavedPinSchema = z.object({
  pinId: z.uuid(),
});

export type ToggleSavedPinInput = z.infer<
  typeof toggleSavedPinSchema
>;