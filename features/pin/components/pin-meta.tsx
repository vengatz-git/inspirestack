import { format } from "date-fns";

import { TopicChip } from "@/features/topic/components/topic-chip";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinMetaProps = {
  pin: Pin;
};

export function PinMeta({ pin }: PinMetaProps) {
  return (
    <div className="space-y-5">
      {/* Title & Description */}
      <div className="space-y-2.5">
        {pin.title ? (
          <h1 className="text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
            {pin.title}
          </h1>
        ) : null}

        {pin.description ? (
          <p className="text-muted-foreground max-w-prose text-sm leading-6">
            {pin.description}
          </p>
        ) : null}
      </div>

      {/* Topic */}
      {pin.topic ? (
        <div>
          <TopicChip
            label={pin.topic.name}
            slug={pin.topic.slug}
          />
        </div>
      ) : null}

      {/* Future metadata */}
      <div className="space-y-3">
        {/* Tags */}
      </div>

      {/* Published */}
      <div>
        <p className="text-muted-foreground text-xs">
          Published <span className="mx-2">•</span>
          {format(pin.createdAt, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
}