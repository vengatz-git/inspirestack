import { FeedGrid } from "@/features/feed/components/feed-grid";
import { FeedSection } from "@/features/feed/components/feed-section";

import { getRelatedPinsService } from "../services/get-related-pins";

interface RelatedPinsProps {
  pinId: string;
}

export async function RelatedPins({
  pinId,
}: RelatedPinsProps) {
  const pins = await getRelatedPinsService({ pinId });

  if (pins.length === 0) {
    return null;
  }

  return (
    <FeedSection title="More to explore">
      <FeedGrid pins={pins} />
    </FeedSection>
  );
}