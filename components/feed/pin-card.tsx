import Image from "next/image";
import type { InferSelectModel } from "drizzle-orm";

import { posts } from "@/lib/db/schema/posts";

type Post = InferSelectModel<typeof posts>;

interface PinCardProps {
  pin: Post;
}

export function PinCard({ pin }: PinCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={pin.imageUrl}
          alt={pin.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
        />
      </div>

      <div className="space-y-2 p-4">
        <h2 className="line-clamp-2 text-lg font-semibold">
          {pin.title}
        </h2>

        {pin.description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {pin.description}
          </p>
        )}
      </div>
    </article>
  );
}