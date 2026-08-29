"use client";

import { useRef, useState } from "react";

import type { BoardSummary } from "@/features/board/types/board";
import type { CommentData } from "@/features/comment/types/comment";

import { getPinByIdService } from "../services/get-pin-by-id";

import { CommentsSection } from "./comments-section";
import type { CommentsSectionHandle } from "./comments-section";
import { PinAuthor } from "./pin-author";
import { PinHeader } from "./pin-header";
import { PinMeta } from "./pin-meta";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

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
  const [isCommentsExpanded, setIsCommentsExpanded] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const commentsRef =
    useRef<CommentsSectionHandle>(null);

  function handleCommentClick() {
    setIsCommentsExpanded(true);

    requestAnimationFrame(() => {
      commentsRef.current?.focusInput();
    });
  }

  return (
    <section className="bg-card flex h-full min-h-0 flex-col overflow-hidden">
      <header className="shrink-0 px-4 py-2">
        <PinHeader
          pin={pin}
          boards={boards}
          onCommentClick={handleCommentClick}
          onToggleDetails={() =>
            setShowDetails((current) => !current)
          }
          showDetails={showDetails}
        />
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-5 pt-4">
        <div className="shrink-0 space-y-4">
          <PinAuthor pin={pin} />

          <PinMeta
            pin={pin}
            showDetails={showDetails}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <CommentsSection
            ref={commentsRef}
            pinId={pin.id}
            comments={comments}
            currentUserId={currentUserId}
            isExpanded={isCommentsExpanded}
            onExpandedChange={setIsCommentsExpanded}
          />
        </div>
      </div>
    </section>
  );
}