interface EstimateHeightOptions {
  imageWidth: number;
  imageHeight: number;
  columnWidth: number;
}

export function estimateHeight({
  imageWidth,
  imageHeight,
  columnWidth,
}: EstimateHeightOptions) {
  const aspectRatio = imageHeight / imageWidth;

  return columnWidth * aspectRatio;
}