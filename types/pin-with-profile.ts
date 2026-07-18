import type { InferSelectModel } from "drizzle-orm";

import { posts } from "@/lib/db/schema/posts";
import { profiles } from "@/lib/db/schema/profiles";

export type Pin = InferSelectModel<typeof posts>;

export type Profile = InferSelectModel<typeof profiles>;

export interface PinWithProfile extends Pin {
  profile: Profile;
}