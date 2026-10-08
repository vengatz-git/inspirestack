import type { BoardSummary } from "@/features/board/types/board";

import type { FeedResult } from "../types/feed";

import { ClientFeed } from "./client-feed";
import { FeedEmptyState } from "./feed-empty-state";

interface HomeFeedProps {
  feed: FeedResult;
  boards: BoardSummary[];
}

export function HomeFeed({
  feed,
  boards,
}: HomeFeedProps) {
  if (feed.pins.length === 0) {
    return <FeedEmptyState />;
  }

  return (
    <ClientFeed
      initialFeed={feed}
      boards={boards}
    />
  );
}