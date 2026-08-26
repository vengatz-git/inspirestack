import type { BoardSummary } from "@/features/board/types/board";
import type { CommentData } from "@/features/comment/types/comment";
import type { PinCardData } from "../types/pin-card";

import { getPinByIdService } from "../services/get-pin-by-id";

import { FeedGrid } from "@/features/feed/components/feed-grid";

import { StickyWorkspace } from "./sticky-workspace";
import { PinDetailLayout } from "./pin-detail-layout";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

interface PinDetailProps {
  pin: Pin;
  relatedPins: PinCardData[];
  boards: BoardSummary[];
  isOwner: boolean;
  comments: CommentData[];
  currentUserId: string | null;
}

export function PinDetail({
  pin,
  relatedPins,
  boards,
  isOwner,
  comments,
  currentUserId,
}: PinDetailProps) {
  return (
    <>
      <PinDetailLayout>
        <StickyWorkspace
          pin={pin}
          boards={boards}
          isOwner={isOwner}
          comments={comments}
          currentUserId={currentUserId}
        />
      </PinDetailLayout>

      <section className="mx-auto mt-10 max-w-screen-2xl px-6">
        <div className="mb-8 flex justify-center">
          <h2 className="text-2xl font-semibold">
            More like this
          </h2>
        </div>

        <FeedGrid pins={relatedPins} />
      </section>
    </>
  );
}