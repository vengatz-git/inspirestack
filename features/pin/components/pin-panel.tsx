import { getPinByIdService } from "../services/get-pin-by-id";

import { CommentsSection } from "./comments-section";
import { PinAuthor } from "./pin-author";
import { PinHeader } from "./pin-header";
import { PinMeta } from "./pin-meta";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

interface PinPanelProps {
  pin: Pin;
}

export function PinPanel({
  pin,
}: PinPanelProps) {
  return (
    <section className="flex h-full flex-col overflow-hidden bg-card">
      <header className="shrink-0 border-b px-8 py-5">
        <PinHeader />
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8 px-8 py-8">
          <PinAuthor pin={pin} />
          <PinMeta pin={pin} />
        </div>

        <div className="border-t px-8 py-6">
          <CommentsSection />
        </div>
      </div>
    </section>
  );
}