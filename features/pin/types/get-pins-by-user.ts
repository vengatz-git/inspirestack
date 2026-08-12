import type { PinCardData } from "./pin-card";

export interface GetUserPinsOptions {
  userId: string;
  limit?: number;
  cursor?: string;
}

export interface GetUserPinsResult {
  pins: PinCardData[];
  nextCursor: string | null;
}