import { useCallback, useState } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.25;

export function useImageZoom() {
  const [scale, setScale] = useState(1);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + STEP, MAX_SCALE));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - STEP, MIN_SCALE));
  }, []);

  const reset = useCallback(() => {
    setScale(MIN_SCALE);
  }, []);

  return {
    scale,
    zoomIn,
    zoomOut,
    reset,
  };
}