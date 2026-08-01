export type OverlayVariant =
  | "minimal"
  | "full";

export function getOverlayVariant(
  imageWidth: number,
  imageHeight: number,
): OverlayVariant {
  const ratio = imageWidth / imageHeight;

  // Landscape & banner images
  if (ratio > 1.2) {
    return "minimal";
  }

  // Portrait & square images
  return "full";
}