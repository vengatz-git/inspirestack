import type { InferSelectModel } from "drizzle-orm";

import { posts } from "@/lib/db/schema/posts";

export type Pin = InferSelectModel<typeof posts>;