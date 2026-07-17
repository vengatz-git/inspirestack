"use client";

import { Button } from "@/components/ui/button";
import { Heart, Link2, Share2 } from "lucide-react";

export function PinActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="lg"
        className="rounded-full"
      >
        <Heart className="mr-2 h-4 w-4" />
        Save
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="rounded-full"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="rounded-full"
      >
        <Link2 className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
}