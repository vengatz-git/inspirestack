"use client";

import {
  ChevronDown,
  Copy,
  Download,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BoardSaveButton } from "@/features/board/components/board-save-button";
import type { BoardSummary } from "@/features/board/types/board";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

interface PinHeaderProps {
  pin: Pin;
  boards: BoardSummary[];
  onCommentClick: () => void;
  onToggleDetails: () => void;
  showDetails: boolean;
}

export function PinHeader({
  pin,
  boards,
  onCommentClick,
  onToggleDetails,
  showDetails,
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
    await navigator.clipboard.writeText(
      window.location.href,
    );

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
    <header className="flex w-full items-center justify-between">
      {/* Left-side actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Like pin"
          className="size-9 rounded-full"
        >
          <Heart className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Comments"
          className="size-9 rounded-full"
          onClick={onCommentClick}
        >
          <MessageCircle className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Share pin"
          className="size-9 rounded-full"
          onClick={handleShare}
        >
          <Share2 className="size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="More actions"
                className="size-9 rounded-full"
              />
            }
          >
            <MoreHorizontal className="size-5" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            sideOffset={8}
          >
            <DropdownMenuItem
              onClick={onToggleDetails}
            >
              <span>
                {showDetails
                  ? "Hide details"
                  : "See details"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDownload}
            >
              <Download />
              <span>Download</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleCopyLink}
            >
              <Copy />
              <span>Copy link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-2">
        {/* <button
          type="button"
          className="text-foreground hover:bg-muted flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors"
          aria-label={`Topic: ${pin.topic.name}`}
        >
          <span>{pin.topic.name}</span>
          <ChevronDown className="size-4" />
        </button> */}

        <BoardSaveButton
          pinId={pin.id}
          boards={boards}
        />
      </div>
    </header>
  );
}