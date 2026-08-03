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
    <aside className="flex flex-col border-l">
      <div className="border-b px-8 py-6">
        <PinHeader />
      </div>

      <div className="space-y-10 px-8 py-8">
        <PinAuthor pin={pin} />
        <PinMeta pin={pin} />
      </div>

      <div className="border-t px-8 py-6">
        <CommentsSection />
      </div>
    </aside>
  );
}