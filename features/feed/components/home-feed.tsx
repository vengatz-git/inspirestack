import type { FeedResult } from "../types/feed";

import { FeedEmptyState } from "./feed-empty-state";
import { ClientFeed } from "./client-feed";

interface HomeFeedProps {
  feed: FeedResult;
}

export function HomeFeed({ feed }: HomeFeedProps) {
  if (feed.pins.length === 0) {
    return <FeedEmptyState />;
  }

  return <ClientFeed initialFeed={feed} />;
}