import { db } from "@/db";
import { getPinLikeDataForPins } from "@/features/like/services/get-pin-like-data";
import { mapPinToCard } from "@/features/pin/lib/map-pin-card";

export async function getTopicBySlug(
  slug: string,
  viewerUserId?: string | null,
) {
  const topic = await db.query.topics.findFirst({
    where: (topics, { eq }) => eq(topics.slug, slug),

    with: {
      pins: {
        where: (pins, { and, eq, or }) =>
          viewerUserId
            ? or(
                eq(pins.visibility, "PUBLIC"),
                and(
                  eq(pins.visibility, "PRIVATE"),
                  eq(pins.authorId, viewerUserId),
                ),
              )
            : eq(pins.visibility, "PUBLIC"),
        orderBy: (pins, { desc }) => [desc(pins.createdAt)],
      },
    },
  });

  if (!topic) {
    return null;
  }

  const likeDataByPinId = await getPinLikeDataForPins(
    topic.pins.map((pin) => pin.id),
    viewerUserId,
  );

  return {
    ...topic,
    pins: topic.pins.map((pin) => {
      const likeData = likeDataByPinId.get(pin.id);

      return {
        ...mapPinToCard(pin),
        likeCount: likeData?.likeCount ?? 0,
        isLiked: likeData?.isLiked ?? false,
      };
    }),
  };
}