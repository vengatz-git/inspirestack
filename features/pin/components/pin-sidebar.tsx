import { getPinByIdService } from "../services/get-pin-by-id";

import { CommentsSection } from "./comments-section";
import { PinAuthor } from "./pin-author";
import { PinHeader } from "./pin-header";
import { PinMeta } from "./pin-meta";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

type PinSidebarProps = {
  pin: Pin;
};

export function PinSidebar({ pin }: PinSidebarProps) {
  return (
    <aside className="flex h-full flex-col">
      {/* Top Action Bar */}
      <div className="border-b px-8 py-6">
        <PinHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-10 px-8 py-8">
          <PinAuthor pin={pin} />

          <PinMeta pin={pin} />
        </div>
      </div>

      {/* Future: Categories & Tags */}

      <div className="space-y-3">
        {/* Category */}

        {/* Tags */}
      </div>

      {/* Comments */}
      <div className="border-t px-8 py-6">
        <CommentsSection />
      </div>
    </aside>
  );
}
