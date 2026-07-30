import { getPinByIdService } from "../services/get-pin-by-id";

import { CommentsSection } from "./comments-section";
import { PinAuthor } from "./pin-author";
import { PinHeader } from "./pin-header";
import { PinMeta } from "./pin-meta";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

type PinSidebarProps = {
  pin: Pin;
};

export function PinSidebar({
  pin,
}: PinSidebarProps) {
  return (
    <aside className="flex h-full flex-col p-8">
      <div className="space-y-8">
        <PinHeader />

        <PinAuthor pin={pin} />

        <PinMeta pin={pin} />
      </div>

      <div className="mt-auto border-t pt-6">
        <CommentsSection />
      </div>
    </aside>
  );
}