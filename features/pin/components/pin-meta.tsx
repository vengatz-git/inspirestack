import { format } from "date-fns";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

type PinMetaProps = {
  pin: Pin;
};

export function PinMeta({
  pin,
}: PinMetaProps) {
  return (
    <div className="space-y-8">
      {/* Title & Description */}
      <div className="space-y-5">
        {pin.title ? (
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
            {pin.title}
          </h1>
        ) : null}

        {pin.description ? (
          <p className="max-w-prose text-base leading-7 text-muted-foreground">
            {pin.description}
          </p>
        ) : null}
      </div>

      {/* Future metadata */}
      <div className="space-y-4">
        {/* Category */}
        {/*
        <div>
          <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
            Character
          </span>
        </div>
        */}

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
        <p className="text-sm text-muted-foreground">
          Published{" "}
          <span className="mx-2">•</span>
          {format(pin.createdAt, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
}