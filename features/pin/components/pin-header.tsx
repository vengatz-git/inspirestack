"use client";

import {
  Copy,
  Download,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

import type { BoardSummary } from "@/features/board/types/board";

import { getPinByIdService } from "../services/get-pin-by-id";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoardSaveButton } from "@/features/board/components/board-save-button";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface PinHeaderProps {
  pin: Pin;
  boards: BoardSummary[];
  isOwner: boolean;
  onCommentClick: () => void;
}

export function PinHeader({
  pin,
  boards,
  isOwner,
  onCommentClick,
}: PinHeaderProps) {
  async function handleShare() {
    if (!navigator.share) {
      await handleCopyLink();
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

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);

    toast.success("Link copied to clipboard.");
  }

  async function handleDownload() {
    try {
      const response = await fetch(pin.imageUrl);

      if (!response.ok) {
        throw new Error("Failed to download image.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `inspirestack-${pin.id}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      toast.error("Unable to download image.");
    }
  }

  return (
    <header className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Comments"
        className="size-8 rounded-md"
        onClick={onCommentClick}
      >
        <MessageCircle className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Share pin"
        className="size-8 rounded-md"
        onClick={handleShare}
      >
        <Share2 className="size-4" />
      </Button>

      {isOwner ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="More actions"
                className="size-8 rounded-md"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuItem onClick={handleDownload}>
              <Download />
              <span>Download</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleCopyLink}>
              <Copy />
              <span>Copy link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="More actions"
                className="size-8 rounded-md"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuItem onClick={handleDownload}>
              <Download />
              <span>Download</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleCopyLink}>
              <Copy />
              <span>Copy link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <BoardSaveButton pinId={pin.id} boards={boards} />
    </header>
  );
}