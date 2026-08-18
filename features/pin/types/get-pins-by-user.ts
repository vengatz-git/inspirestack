import type { ProfilePinCardData } from "@/features/profile/types/profile-pin-card";

export interface GetUserPinsOptions {
  userId: string;
  limit?: number;
  cursor?: string;
}

export interface GetUserPinsResult {
  pins: ProfilePinCardData[];
  nextCursor: string | null;
}