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
    <div className="mb-8 flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-5" />
      </Button>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
        >
          <Share2 className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          disabled
        >
          <MoreHorizontal className="size-5" />
        </Button>

        <Button disabled>
          <Bookmark className="mr-2 size-4" />
          Save
        </Button>
      </div>
    </div>
  );
}