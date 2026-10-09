"use client";

import { useRouter } from "next/navigation";
import {
  Copy,
  Download,
  Ellipsis,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PinCardMoreButtonProps {
  pinId: string;
  imageUrl: string;
}

export function PinCardMoreButton({
  pinId,
  imageUrl,
}: PinCardMoreButtonProps) {
  const router = useRouter();

  async function handleCopyLink() {
    try {
      const url = `${window.location.origin}/pin/${pinId}`;

      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Unable to copy the link.");
    }
  }

  async function handleDownload() {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Download failed.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = `inspirestack-${pinId}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);
    } catch {
      toast.error("Unable to download the image.");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        aria-label="More options"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black backdrop-blur-md transition-colors hover:bg-white active:bg-zinc-100"
      >
        <Ellipsis
          size={18}
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={8}
      >
        <DropdownMenuItem
          onClick={() => router.push(`/pin/${pinId}`)}
        >
          <ExternalLink />
          Open Pin
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleCopyLink}>
          <Copy />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDownload}>
          <Download />
          Download image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}