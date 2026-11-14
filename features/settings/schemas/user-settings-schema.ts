import { z } from "zod";

export const userSettingsSchema = z.object({
  notifyComments: z.boolean(),
  notifyReplies: z.boolean(),
  notifySaves: z.boolean(),
  notifyLikes: z.boolean(),
  notifyFollows: z.boolean(),
  defaultPinVisibility: z.enum(["PUBLIC", "PRIVATE"]),
  defaultBoardVisibility: z.enum(["PUBLIC", "PRIVATE"]),
});

export type UserSettings = z.infer<typeof userSettingsSchema>;