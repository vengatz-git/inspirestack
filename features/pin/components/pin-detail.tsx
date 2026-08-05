import { getPinByIdService } from "../services/get-pin-by-id";

import { StickyWorkspace } from "./sticky-workspace";
import { PinDetailLayout } from "./pin-detail-layout";
import { PinCard } from "./pin-card";

import type { PinCardData } from "../types/pin-card";

import { FeedGrid } from "@/features/feed/components/feed-grid";
import type { BoardSummary } from "@/features/board/types/board";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface PinDetailProps {
  pin: Pin;
  relatedPins: PinCardData[];
  boards: BoardSummary[];
}

export function PinDetail({ pin, relatedPins, boards }: PinDetailProps) {
  return (
    <>
      <PinDetailLayout>
        <StickyWorkspace pin={pin} boards={boards} />
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
