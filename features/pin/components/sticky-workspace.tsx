import type { BoardSummary } from "@/features/board/types/board";
import type { CommentData } from "@/features/comment/types/comment";

import { getPinByIdService } from "../services/get-pin-by-id";

import { PinImage } from "./pin-image";
import { PinPanel } from "./pin-panel";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface StickyWorkspaceProps {
  pin: Pin;
  boards: BoardSummary[];
  isOwner: boolean;
  comments: CommentData[];
  currentUserId: string | null;
}

export function StickyWorkspace({
  pin,
  boards,
  isOwner,
  comments,
  currentUserId,
}: StickyWorkspaceProps) {
  return (
    <section className="w-full">
      <div
        className="
          mx-auto
          w-full
          max-w-[1088px]
          overflow-hidden
          rounded-3xl
          border
          bg-card
          shadow-2xl
          md:h-[504px]
        "
      >
        <div className="grid min-h-0 grid-cols-1 md:h-full md:grid-cols-2">
          <div className="aspect-[4/5] min-h-0 min-w-0 md:aspect-auto">
            <PinImage pin={pin} />
          </div>

          <div className="min-h-0 min-w-0 overflow-hidden">
            <PinPanel
              pin={pin}
              boards={boards}
              isOwner={isOwner}
              comments={comments}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}