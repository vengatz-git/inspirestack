import type { PinCardData } from "@/features/pin/types/pin-card";

export interface GetFeedOptions {
  limit?: number;
  cursor?: string;
}

export interface FeedResult {
  pins: PinCardData[];
  nextCursor: string | null;
}