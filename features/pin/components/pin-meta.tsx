import { format } from "date-fns";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinMetaProps = {
  pin: Pin;
};

export function PinMeta({ pin }: PinMetaProps) {
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

      <div className="space-y-3">
        {/* Tags */}
      </div>

      <div>
        <p className="text-muted-foreground text-xs">
          Published <span className="mx-2">•</span>
          {format(pin.createdAt, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
}