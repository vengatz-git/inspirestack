"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Heart, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";

export function PinActions() {
  const [saved, setSaved] = useState(false);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Failed to copy the link.");
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });

        return;
      } catch {
        // User cancelled or share failed.
      }
    }

    handleCopyLink();
  }

  function handleSave() {
    setSaved((previous) => !previous);

    toast.success(
      saved ? "Removed from saved pins." : "Saved successfully."
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="lg"
        className="rounded-full"
        onClick={handleSave}
      >
        <Heart
          className={`mr-2 h-4 w-4 ${
            saved ? "fill-current" : ""
          }`}
        />
        {saved ? "Saved" : "Save"}
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="rounded-full"
        onClick={handleShare}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="rounded-full"
        onClick={handleCopyLink}
      >
        <Link2 className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
}