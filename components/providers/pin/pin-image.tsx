import Image from "next/image";

interface PinImageProps {
  src: string;
  alt: string;
}

export function PinImage({
  src,
  alt,
}: PinImageProps) {
  return (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-center
        overflow-hidden
      "
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1600}
        priority
        className="
          max-h-full
          max-w-full
          h-auto
          w-auto
          rounded-2xl
          object-contain
          select-none
        "
      />
    </div>
  );
}