import { PinCardData } from "@/features/pin";
import { MasonryEngine } from "./masonry-engine";

interface FeedGridProps {
  pins: PinCardData[];
}

export function FeedGrid({
  pins,
}: FeedGridProps) {
  return <MasonryEngine pins={pins} />;
}