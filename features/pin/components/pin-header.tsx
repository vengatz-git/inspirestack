"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Share2 } from "lucide-react";
import { toast } from "sonner";

import type { BoardSummary } from "@/features/board/types/board";

import { getPinByIdService } from "../services/get-pin-by-id";

import { Button } from "@/components/ui/button";
import { BoardSaveButton } from "@/features/board/components/board-save-button";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

interface PinHeaderProps {
  pin: Pin;
  boards: BoardSummary[];
  isOwner: boolean;
}

export function PinHeader({
  pin,
  boards,
  isOwner,
}: PinHeaderProps) {
  const router = useRouter();

  async function handleShare() {
    if (!navigator.share) {
      await navigator.clipboard.writeText(
        window.location.href,
      );

      toast.success("Link copied to clipboard.");

      return;
    }

    try {
      await navigator.share({
        url: window.location.href,
      });
    } catch {
      // User cancelled.
    }
  }

  return (
    <header className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Share pin"
        className="size-9 rounded-md"
        onClick={handleShare}
      >
        <Share2 className="size-4" />
      </Button>

      {isOwner ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label="More actions"
          className="size-9 rounded-md"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      ) : null}

      <BoardSaveButton
        pinId={pin.id}
        boards={boards}
      />
    </header>
  );
}