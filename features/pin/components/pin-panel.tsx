import type { BoardSummary } from "@/features/board/types/board";
import type { CommentData } from "@/features/comment/types/comment";

import { getPinByIdService } from "../services/get-pin-by-id";

import { CommentsSection } from "./comments-section";
import { PinAuthor } from "./pin-author";
import { PinHeader } from "./pin-header";
import { PinMeta } from "./pin-meta";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface PinPanelProps {
  pin: Pin;
  boards: BoardSummary[];
  isOwner: boolean;
  comments: CommentData[];
  currentUserId: string | null;
}

export function PinPanel({
  pin,
  boards,
  isOwner,
  comments,
  currentUserId,
}: PinPanelProps) {
  return (
    <section className="bg-card flex h-full flex-col overflow-hidden">
      <header className="shrink-0 border-b px-8 py-5">
        <PinHeader pin={pin} boards={boards} isOwner={isOwner} />
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8 px-8 py-8">
          <PinAuthor pin={pin} />
          <PinMeta pin={pin} />
        </div>

        <div className="border-t px-8 py-6">
          <CommentsSection
            pinId={pin.id}
            comments={comments}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </section>
  );
}
