import Image from "next/image";

interface ContentCardProps {
  title: string;
  author: string;
  image: string;
  priority?: boolean;
}

export function ContentCard({
  title,
  author,
  image,
  priority = false,
}: ContentCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-border/50
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      <div className="space-y-1 p-4">
        <h3 className="line-clamp-2 font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          by {author}
        </p>
      </div>
    </article>
  );
}