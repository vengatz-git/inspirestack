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
      className="relative overflow-hidden rounded-3xl"
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        sizes="
          (max-width:640px) 100vw,
          (max-width:1024px) 50vw,
          (max-width:1280px) 33vw,
          25vw
        "
        unoptimized
        className="
          h-full
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