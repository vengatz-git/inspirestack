import type { PinCardData } from "@/features/pin/types/pin-card";

export interface SearchUser {
  id: string;
  username: string;
  displayName: string | null;
  image: string | null;
}

export interface SearchResultsData {
  users: SearchUser[];
  pins: PinCardData[];
}