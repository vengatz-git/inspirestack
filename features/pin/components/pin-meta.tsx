import { format } from "date-fns";

import { TopicChip } from "@/features/topic/components/topic-chip";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinMetaProps = {
  pin: Pin;
};

export function PinMeta({ pin }: PinMetaProps) {
  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="space-y-3">
        {pin.title ? (
          <h1 className="text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
            {pin.title}
          </h1>
        ) : null}

        {pin.description ? (
          <p className="text-muted-foreground max-w-prose text-sm leading-7">
            {pin.description}
          </p>
        ) : null}
      </div>

      {/* Topic */}
      {pin.topic ? (
        <div>
          <TopicChip label={pin.topic.name} slug={pin.topic.slug} />
        </div>
      ) : null}

      {/* Future metadata */}
      <div className="space-y-4">
        {/* Tags */}
        {/*
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border px-3 py-1 text-xs">
            Anime
          </span>

          <span className="rounded-full border px-3 py-1 text-xs">
            Berserk
          </span>

          <span className="rounded-full border px-3 py-1 text-xs">
            Fantasy
          </span>
        </div>
        */}
      </div>

      {/* Published */}
      <div>
        <p className="text-muted-foreground text-sm">
          Published <span className="mx-2">•</span>
          {format(pin.createdAt, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
}
