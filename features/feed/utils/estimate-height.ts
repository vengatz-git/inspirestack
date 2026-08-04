interface EstimateHeightOptions {
  imageWidth: number;
  imageHeight: number;
  columnWidth: number;
}

const CARD_PADDING = 16;
const CARD_METADATA_HEIGHT = 48;

export function estimateHeight({
  imageWidth,
  imageHeight,
  columnWidth,
}: EstimateHeightOptions) {
  const aspectRatio = imageHeight / imageWidth;

  const renderedImageHeight = columnWidth * aspectRatio;

  return (
    renderedImageHeight +
    CARD_PADDING +
    CARD_METADATA_HEIGHT
  );
}