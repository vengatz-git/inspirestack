import type { BoardSummary } from "@/features/board/types/board";
import type { PinCardData } from "@/features/pin/types/pin-card";

import { MasonryEngine } from "./masonry-engine";

interface FeedGridProps {
  pins: PinCardData[];
  boards?: BoardSummary[];
}

export function FeedGrid({
  pins,
  boards = [],
}: FeedGridProps) {
  return (
    <MasonryEngine
      pins={pins}
      boards={boards}
    />
  );
}