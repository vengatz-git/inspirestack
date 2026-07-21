"use client";

import { RefObject, useEffect } from "react";

interface UseClickOutsideOptions {
  ref: RefObject<HTMLElement | null>;
  enabled?: boolean;
  onClickOutside: () => void;
}

export function useClickOutside({
  ref,
  enabled = true,
  onClickOutside,
}: UseClickOutsideOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const element = ref.current;

      if (!element) {
        return;
      }

      if (!element.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
    };
  }, [enabled, onClickOutside, ref]);
}