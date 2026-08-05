import type { PinCardData } from "@/features/pin/types/pin-card";

export interface BoardDetail {
  id: string;

  name: string;
  description: string | null;

  visibility: "PUBLIC" | "PRIVATE";

  owner: {
    id: string;
    username: string;
    displayName: string | null;
    image: string | null;
  };

  coverImageUrl: string | null;

  pinCount: number;

  pins: PinCardData[];

  createdAt: Date;
  updatedAt: Date;
}