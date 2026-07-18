import Image from "next/image";

interface PinCardImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function PinCardImage({
  src,
  alt,
  width,
  height,
}: PinCardImageProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
    >

      {/* TODO */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="
          h-auto
          w-full
          object-cover
          transition-transform
          duration-500
          ease-out
          group-hover:scale-[1.03]
        "
      />
    </div>
  );
}