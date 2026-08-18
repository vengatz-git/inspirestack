import { z } from "zod";

export const deletePinSchema = z.object({
  pinId: z.uuid(),
});