import type { BoardSummary } from "@/features/board/types/board";

import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";

import { PinAuthor } from "@/features/pin/components/pin-author";
import { PinImage } from "@/features/pin/components/pin-image";
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
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="grid md:grid-cols-2">
        <div className="h-105 min-w-0 md:h-110">
          <PinImage pin={pin} />
        </div>

        <section className="flex h-105 min-w-0 flex-col md:h-110">
          <header className="flex shrink-0 items-center justify-end border-b px-6 py-4 sm:px-8">
            <BoardSaveButton
              pinId={pin.id}
              boards={boards}
            />
          </header>

          <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-6 py-6 sm:px-8">
            <div className="space-y-7">
              <PinAuthor pin={pin} />

              <PinMeta pin={pin} />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}