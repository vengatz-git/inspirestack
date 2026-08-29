import { format } from "date-fns";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinMetaProps = {
  pin: Pin;
  showDetails: boolean;
};

export function PinMeta({
  pin,
  showDetails,
}: PinMetaProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {pin.title ? (
          <h3 className="text-xl font-semibold leading-tight tracking-tight">
            {pin.title}
          </h3>
        ) : null}

        {pin.description ? (
          <p className="text-muted-foreground max-w-prose text-sm leading-6">
            {pin.description}
          </p>
        ) : null}
      </div>

      {pin.pinTags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {pin.pinTags.map(({ tag }) => (
            <span
              key={tag.id}
              className="text-muted-foreground text-xs"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      ) : null}

      {showDetails ? (
        <div className="text-muted-foreground text-xs">
          Published{" "}
          <span className="mx-1">•</span>
          {format(pin.createdAt, "MMMM d, yyyy")}
        </div>
      ) : null}
    </div>
  );
}