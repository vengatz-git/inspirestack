import { PinCard } from "@/features/pin";
import type { PinCardData } from "@/features/pin/types/pin-card";

interface MasonryItemProps {
  pin: PinCardData;
}

export function MasonryItem({
  pin,
}: MasonryItemProps) {
  return <PinCard pin={pin} />;
}