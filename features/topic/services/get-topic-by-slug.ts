import { db } from "@/db";
import { mapPinToCard } from "@/features/pin/lib/map-pin-card";

export async function getTopicBySlug(slug: string) {
  const topic = await db.query.topics.findFirst({
    where: (topics, { eq }) => eq(topics.slug, slug),

    with: {
      pins: {
        orderBy: (pins, { desc }) => [desc(pins.createdAt)],
      },
    },
  });

  if (!topic) {
    return null;
  }

  return {
    ...topic,
    pins: topic.pins.map(mapPinToCard),
  };
}
