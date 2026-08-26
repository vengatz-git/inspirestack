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
      <div className="bg-card mx-auto h-[min(760px,calc(100vh-7rem))] max-h-190 min-h-140 w-full max-w-7xl overflow-hidden rounded-3xl border shadow-2xl">
        <div className="grid h-full grid-cols-[1.2fr_1fr]">
          <PinImage pin={pin} />

          <PinPanel
            pin={pin}
            boards={boards}
            isOwner={isOwner}
            comments={comments}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </section>
  );
}
