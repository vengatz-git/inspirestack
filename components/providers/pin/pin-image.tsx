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
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="h-full w-full animate-pulse bg-muted/40" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={2000}
        height={2000}
        priority
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-auto max-h-full w-auto max-w-full select-none object-contain transition-all duration-500 ease-out",
          loaded
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        )}
      />
    </div>
  );
}