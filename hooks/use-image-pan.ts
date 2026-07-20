"use client";

import { useCallback, useState } from "react";

export function useImagePan() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [last, setLast] = useState({ x: 0, y: 0 });

  const startDrag = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    setLast({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const moveDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;

      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      setLast({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [dragging, last]
  );

  const endDrag = useCallback(() => {
    setDragging(false);
  }, []);

  const resetPan = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    position,
    dragging,
    startDrag,
    moveDrag,
    endDrag,
    resetPan,
  };
}