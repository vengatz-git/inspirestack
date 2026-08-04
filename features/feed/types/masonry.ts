import type { PinCardData } from "@/features/pin/types/pin-card";

export interface MasonryColumn {
  id: number;
  pins: PinCardData[];
  estimatedHeight: number;
}

export interface MasonryLayout {
  columns: MasonryColumn[];
}