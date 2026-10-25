"use client";

import {
  Copy,
  Download,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
import { PinLikeButton } from "@/features/like/components/pin-like-button";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<Awaited<ReturnType<typeof getPinByIdService>>>;

interface PinHeaderProps {
  pin: Pin;
  boards: BoardSummary[];
  onCommentClick: () => void;
  onToggleDetails: () => void;
  showDetails: boolean;
  likeCount: number;
  isLiked: boolean;
  currentUserId: string | null;
  isOwner: boolean;
}

export function PinHeader({
  pin,
  boards,
  onCommentClick,
  onToggleDetails,
  showDetails,
  likeCount,
  isLiked,
  currentUserId,
  isOwner,
}: PinHeaderProps) {
  const router = useRouter();

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
      // User cancelled sharing.
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
    <header className="flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        <PinLikeButton
          pinId={pin.id}
          initialIsLiked={isLiked}
          initialLikeCount={likeCount}
          currentUserId={currentUserId}
        />

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

          <DropdownMenuContent align="start" sideOffset={8}>
            {isOwner ? (
              <DropdownMenuItem
                onClick={() => router.push(`/pin/${pin.id}/edit`)}
              >
                <Pencil />
                <span>Edit Pin</span>
              </DropdownMenuItem>
            ) : null}

            <DropdownMenuItem onClick={onToggleDetails}>
              <span>
                {showDetails ? "Hide details" : "See details"}
              </span>
            </DropdownMenuItem>

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
      </div>

      <div className="flex items-center gap-2">
        <BoardSaveButton
          pinId={pin.id}
          boards={boards}
          currentUserId={currentUserId}
        />
      </div>
    </header>
  );
}