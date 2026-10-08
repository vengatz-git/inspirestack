import type { BoardSummary } from "@/features/board/types/board";
import { PinCard } from "@/features/pin";
import type { PinCardData } from "@/features/pin/types/pin-card";

interface MasonryItemProps {
  pin: PinCardData;
  boards?: BoardSummary[];
}

export function MasonryItem({
  pin,
  boards = [],
}: MasonryItemProps) {
  return (
    <PinCard
      pin={pin}
      boards={boards}
    />
  );
}