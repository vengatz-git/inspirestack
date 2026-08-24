import type { PinCardData } from "@/features/pin/types/pin-card";

import type { FeedQuery } from "./feed-query";

export type GetFeedOptions = FeedQuery;

export interface FeedResult {
  pins: PinCardData[];
  nextCursor: string | null;
}