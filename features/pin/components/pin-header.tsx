"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function PinHeader() {
  const router = useRouter();

  async function handleShare() {
    if (!navigator.share) {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied to clipboard.");

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

  return (
    <header className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Go back"
        className="h-11 w-11 rounded-full transition-colors"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-5" />
      </Button>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Share pin"
          className="h-11 w-11 rounded-full transition-colors"
          onClick={handleShare}
        >
          <Share2 className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="More actions"
          disabled
          className="h-11 w-11 rounded-full transition-colors"
        >
          <MoreHorizontal className="size-5" />
        </Button>

        <Button
          disabled
          className="h-11 rounded-full px-6"
        >
          <Bookmark className="mr-2 size-4" />
          Save
        </Button>
      </div>
    </header>
  );
}