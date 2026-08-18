import type { BoardSummary } from "@/features/board/types/board";

import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";

import { PinImage } from "@/features/pin/components/pin-image";
import { PinAuthor } from "@/features/pin/components/pin-author";
import { PinMeta } from "@/features/pin/components/pin-meta";

import { BoardSaveButton } from "@/features/board/components/board-save-button";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

interface ProfilePinDetailsProps {
  pin: Pin;
  boards: BoardSummary[];
}

export function ProfilePinDetails({
  pin,
  boards,
}: ProfilePinDetailsProps) {
  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="grid min-h-[70vh] md:grid-cols-2">
        <PinImage pin={pin} />

        <section className="flex min-w-0 flex-col">
          <header className="flex items-center justify-end border-b px-6 py-5 sm:px-8">
            <BoardSaveButton
              pinId={pin.id}
              boards={boards}
            />
          </header>

          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-8 sm:px-8">
            <PinAuthor pin={pin} />

            <PinMeta pin={pin} />
          </div>
        </section>
      </div>
    </section>
  );
}