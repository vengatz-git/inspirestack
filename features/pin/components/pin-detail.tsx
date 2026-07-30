import { getPinByIdService } from "../services/get-pin-by-id";
import { PinImage } from "./pin-image";
import { PinSidebar } from "./pin-sidebar";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

type PinDetailProps = {
  pin: Pin;
};

export function PinDetail({
  pin,
}: PinDetailProps) {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="grid min-h-[85vh] lg:grid-cols-2">
        <PinImage pin={pin} />

        <PinSidebar pin={pin} />
      </div>
    </section>
  );
}