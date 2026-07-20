"use client";

import { MoreHorizontal, Send } from "lucide-react";
import { PinCardMenu } from "../menus/pin-card-menu";
import { PinWithProfile } from "@/types/pin-with-profile";

interface PinCardActionsProps {
  pin: PinWithProfile;
  compact?: boolean;
}

export function PinCardActions({
  pin,
  compact = false,
}: PinCardActionsProps) {
  return (
    <>
      {/* Top Actions */}
      <div className="flex justify-end p-3">
        <button
          className="
            rounded-full
            bg-red-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition-colors
            hover:bg-red-700
          "
        >
          Save
        </button>
      </div>

      {/* Bottom Actions */}
      {!compact && (
        <div className="flex justify-end gap-2 p-3">
          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white/90
              text-black
              backdrop-blur
              transition
              hover:bg-white
            "
            aria-label="Share"
          >
            <Send className="h-5 w-5" />
          </button>

          <PinCardMenu pin={pin}>
            <button
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-black
                backdrop-blur
                transition
                hover:bg-white
              "
              aria-label="More options"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </PinCardMenu>
        </div>
      )}
    </>
  );
}