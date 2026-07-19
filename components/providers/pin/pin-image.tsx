"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PinImageProps {
  src: string;
  alt: string;
}

export function PinImage({
  src,
  alt,
}: PinImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="
        relative
        flex
        h-full
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-muted/40
        via-background
        to-muted/20
      "
    >
      {!loaded && (
        <div
          className="
            absolute
            inset-0
            animate-pulse
            bg-muted/40
          "
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={2000}
        height={2000}
        priority
        onLoad={() => setLoaded(true)}
        className={cn(
          "max-h-full max-w-full h-auto w-auto object-contain select-none transition-all duration-500 ease-out",
          loaded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        )}
      />
    </div>
  );
}