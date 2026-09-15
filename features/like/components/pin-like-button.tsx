"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePinLikes } from "../hooks/use-pin-likes";

interface PinLikeButtonProps {
  pinId: string;
  initialIsLiked: boolean;
  initialLikeCount: number;
  currentUserId: string | null;
}

export function PinLikeButton({
  pinId,
  initialIsLiked,
  initialLikeCount,
  currentUserId,
}: PinLikeButtonProps) {
  const { isLiked, likeCount, isPending, handleLike } = usePinLikes({
    pinId,
    initialIsLiked,
    initialLikeCount,
    currentUserId,
  });

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        aria-label={isLiked ? "Unlike pin" : "Like pin"}
        aria-pressed={isLiked}
        disabled={isPending}
        className="size-9 rounded-full transition-transform active:scale-90"
        onClick={handleLike}
      >
        <Heart
          className={`size-5 transition-transform duration-150 ${
            isLiked ? "fill-current" : ""
          }`}
          aria-hidden="true"
        />
      </Button>

      {likeCount > 0 && (
        <span className="text-muted-foreground min-w-4 text-sm">
          {likeCount}
        </span>
      )}
    </div>
  );
}
