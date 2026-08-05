import { z } from "zod";

export const removePinSchema = z.object({
  boardId: z.uuid(),
  pinId: z.uuid(),
});

export type RemovePinInput = z.infer<
  typeof removePinSchema
>;