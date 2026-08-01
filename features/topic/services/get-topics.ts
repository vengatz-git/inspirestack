import { asc } from "drizzle-orm";

import { db } from "@/db";
import { topics } from "@/db/schema";

import type { TopicOption } from "../types/topic";

export async function getTopics(): Promise<TopicOption[]> {
  const rows = await db.query.topics.findMany({
    orderBy: asc(topics.name),
  });

  return rows.map((topic) => ({
    id: topic.id,
    name: topic.name,
    slug: topic.slug,
  }));
}