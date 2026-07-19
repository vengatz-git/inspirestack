"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Heart,
  Link2,
  MoreHorizontal,
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

export function PinActions() {
  const router = useRouter();

  const [saved, setSaved] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied.");
    } catch {
      toast.error("Failed to copy link.");
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });

        return;
      } catch {}
    }

    copyLink();
  }

  function toggleSave() {
    setSaved((previous) => !previous);

    toast.success(
      saved
        ? "Removed from saved pins."
        : "Saved successfully."
    );
  }

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={share}
        >
          <Share2 className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={copyLink}>
              <Link2 className="mr-2 h-4 w-4" />
              Copy Link
            </DropdownMenuItem>

            <DropdownMenuItem onClick={share}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button
        size="lg"
        onClick={toggleSave}
        className="rounded-full px-7"
      >
        {saved ? "Saved" : "Save"}
      </Button>
      </div>
    </div>
  );
}