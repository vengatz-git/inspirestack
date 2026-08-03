import { getPinByIdService } from "../services/get-pin-by-id";

import { StickyWorkspace } from "./sticky-workspace";
import { PinDetailLayout } from "./pin-detail-layout";
import type { PinCardData } from "../types/pin-card";
import { PinCard } from "./pin-card";

import { FeedGrid } from "@/features/feed/components/feed-grid";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinDetailProps = {
  pin: Pin;
  relatedPins: PinCardData[];
};

export function PinDetail({ pin, relatedPins }: PinDetailProps) {
  const sideFeed = relatedPins.slice(0, 4);
  const bottomFeed = relatedPins.slice(4);

  return (
    <PinDetailLayout
      workspace={<StickyWorkspace pin={pin} />}
      sideFeed={
        <div className="space-y-4">
          {sideFeed.map((relatedPin) => (
            <PinCard key={relatedPin.id} pin={relatedPin} />
          ))}
        </div>
      }
      feed={<FeedGrid pins={bottomFeed} />}
    />
  );
}
