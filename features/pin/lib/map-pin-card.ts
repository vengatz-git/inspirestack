import type { Pin } from "@/db/schema";
import type { PinCardData } from "@/features/pin/types/pin-card";

export function mapPinToCard(
  pin: Pin,
): PinCardData {
  return {
    id: pin.id,

    title: pin.title,

    imageUrl: pin.imageUrl,
    imageWidth: pin.imageWidth,
    imageHeight: pin.imageHeight,
    altText: pin.altText,

    destinationUrl: null,
  };
}