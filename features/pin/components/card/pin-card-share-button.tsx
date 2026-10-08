"use client";

import type { MouseEvent } from "react";
import { useState } from "react";

import { Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { PinCardActionButton } from "./pin-card-action-button";

interface PinCardShareButtonProps {
  pinId: string;
  title: string | null;
}

export function PinCardShareButton({
  pinId,
  title,
}: PinCardShareButtonProps) {
  const router = useRouter();
  const { status } = useSession();
  const [isSharing, setIsSharing] = useState(false);

  async function handleShare(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (status === "loading" || isSharing) {
      return;
    }

    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    const pinUrl = `${window.location.origin}/pin/${pinId}`;

    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: title ?? "InspireStack Pin",
          text:
            title ??
            "Discover this Pin on InspireStack.",
          url: pinUrl,
        });

        return;
      }

      if (!navigator.clipboard) {
        toast.error(
          "Sharing is not supported in this browser.",
        );
        return;
      }

      await navigator.clipboard.writeText(pinUrl);
      toast.success("Pin link copied.");
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      toast.error("Unable to share this Pin.");
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <PinCardActionButton
      aria-label="Share pin"
      disabled={status === "loading" || isSharing}
      onClick={handleShare}
    >
      <Share2
        size={18}
        aria-hidden="true"
      />
    </PinCardActionButton>
  );
}