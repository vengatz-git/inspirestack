import type { FeedResult } from "../types/feed";

import { ClientFeed } from "./client-feed";

interface HomeFeedProps {
  feed: FeedResult;
}

export function HomeFeed({ feed }: HomeFeedProps) {
  if (feed.pins.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-muted-foreground">
          No pins found.
        </p>
      </div>
    );
  }

  return <ClientFeed initialFeed={feed} />;
}