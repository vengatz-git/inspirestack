import { z } from "zod";

export const savePinSchema = z.object({
  boardId: z.uuid(),
  pinId: z.uuid(),
});

export type SavePinInput =
  z.infer<typeof savePinSchema>;