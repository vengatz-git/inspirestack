import { getPinByIdService } from "../services/get-pin-by-id";

import { StickyWorkspace } from "./sticky-workspace";
import { PinDetailLayout } from "./pin-detail-layout";
import { PinCard } from "./pin-card";

import type { PinCardData } from "../types/pin-card";

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
    <>
      <PinDetailLayout>
        <StickyWorkspace pin={pin} />
      </PinDetailLayout>

      <section className="mx-auto mt-10 max-w-screen-2xl px-6">
        <div className="mb-8 flex justify-center">
          <h2 className="text-2xl font-semibold">More like this</h2>
        </div>

        <FeedGrid pins={relatedPins} />
      </section>
    </>
  );
}
