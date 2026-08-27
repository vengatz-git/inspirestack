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
      <div className="bg-card mx-auto h-[calc(100dvh-8rem)] min-h-0 w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl">
        <div className="grid h-full grid-cols-2">
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
