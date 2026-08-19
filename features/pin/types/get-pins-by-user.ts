import type { ProfilePinCardData } from "@/features/profile/types/profile-pin-card";

export interface GetUserPinsOptions {
  userId: string;
  viewerUserId?: string | null;
  limit?: number;
  cursor?: string;
  excludePinId?: string;
}

export interface GetUserPinsResult {
  pins: ProfilePinCardData[];
  nextCursor: string | null;
}