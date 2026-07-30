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
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          {pin.title ?? "Untitled Pin"}
        </h1>
      </div>

      {pin.description ? (
        <p className="text-muted-foreground leading-7">
          {pin.description}
        </p>
      ) : null}

      <div className="border-t pt-6">
        <p className="text-muted-foreground text-sm">
          Published{" "}
          {format(pin.createdAt, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
}