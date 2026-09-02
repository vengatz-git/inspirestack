"use client";

import { useRef, useState } from "react";

import type { BoardSummary } from "@/features/board/types/board";
import type { CommentData } from "@/features/comment/types/comment";

import { MobileCommentsSheet } from "@/components/ui/mobile-comments-sheet";
import { usePinComments } from "@/features/comment/hooks/use-pin-comments";

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
  comments: initialComments,
  currentUserId,
}: PinPanelProps) {
  const [isCommentsExpanded, setIsCommentsExpanded] =
    useState(false);

  const [isMobileCommentsOpen, setIsMobileCommentsOpen] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const desktopCommentsRef =
    useRef<CommentsSectionHandle>(null);

  const mobileCommentsRef =
    useRef<CommentsSectionHandle>(null);

  const {
    comments,
    replyingTo,
    replyToUsername,
    handleReply,
    handleCancelReply,
  } = usePinComments({
    pinId: pin.id,
    initialComments,
  });

  function handleCommentClick() {
    const isMobile = window.matchMedia(
      "(max-width: 767px)",
    ).matches;

    if (isMobile) {
      setIsMobileCommentsOpen(true);

      requestAnimationFrame(() => {
        mobileCommentsRef.current?.focusInput();
      });

      return;
    }

    setIsCommentsExpanded(true);

    requestAnimationFrame(() => {
      desktopCommentsRef.current?.focusInput();
    });
  }

  return (
    <>
      <section className="flex h-auto min-h-0 flex-col overflow-hidden bg-card md:h-full">
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

        <div className="flex min-h-0 flex-1 flex-col px-5 pt-4 pb-4 md:pb-0">
          <div className="shrink-0 space-y-4">
            <PinAuthor pin={pin} />

            <PinMeta
              pin={pin}
              showDetails={showDetails}
            />
          </div>

          {/* Desktop comments */}
          <div className="hidden min-h-0 flex-1 flex-col md:flex">
            <CommentsSection
              ref={desktopCommentsRef}
              pinId={pin.id}
              comments={comments}
              currentUserId={currentUserId}
              isExpanded={isCommentsExpanded}
              onExpandedChange={
                setIsCommentsExpanded
              }
              replyingTo={replyingTo}
              replyToUsername={replyToUsername}
              onReply={handleReply}
              onCancelReply={handleCancelReply}
            />
          </div>
        </div>
      </section>

      {/* Mobile comments */}
      <MobileCommentsSheet
        open={isMobileCommentsOpen}
        onOpenChange={setIsMobileCommentsOpen}
      >
        <CommentsSection
          ref={mobileCommentsRef}
          pinId={pin.id}
          comments={comments}
          currentUserId={currentUserId}
          isExpanded={true}
          onExpandedChange={() => {}}
          replyingTo={replyingTo}
          replyToUsername={replyToUsername}
          onReply={handleReply}
          onCancelReply={handleCancelReply}
          showHeader={false}
        />
      </MobileCommentsSheet>
    </>
  );
}