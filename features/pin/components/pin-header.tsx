"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreHorizontal,
  Share2,
} from "lucide-react";
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
    <header className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Go back"
        className="h-11 w-11 rounded-full"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-5" />
      </Button>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Share pin"
          className="h-11 w-11 rounded-full"
          onClick={handleShare}
        >
          <Share2 className="size-5" />
        </Button>

        {isOwner && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="More actions"
            className="h-11 w-11 rounded-full"
          >
            <MoreHorizontal className="size-5" />
          </Button>
        )}

        <BoardSaveButton
          pinId={pin.id}
          boards={boards}
        />
      </div>
    </header>
  );
}