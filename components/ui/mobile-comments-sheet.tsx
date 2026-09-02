"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MobileCommentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function MobileCommentsSheet({
  open,
  onOpenChange,
  children,
}: MobileCommentsSheetProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            transition-opacity
            duration-200
            data-[ending-style]:opacity-0
            data-[starting-style]:opacity-0
            md:hidden
          "
        />

        <Dialog.Popup
          className="
            fixed
            inset-x-0
            bottom-0
            z-50
            flex
            h-[80dvh]
            flex-col
            overflow-hidden
            rounded-t-3xl
            border
            bg-card
            shadow-2xl
            outline-none
            transition-transform
            duration-300
            data-[ending-style]:translate-y-full
            data-[starting-style]:translate-y-full
            md:hidden
          "
        >
          <header className="flex shrink-0 items-center justify-between border-b px-5 py-4">
            <Dialog.Title className="text-lg font-semibold">
              Comments
            </Dialog.Title>

            <Dialog.Close
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close comments"
                  className="size-9 rounded-full"
                />
              }
            >
              <X className="size-5" />
            </Dialog.Close>
          </header>

          <div className="min-h-0 flex-1 px-5">
            {children}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}