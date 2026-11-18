"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { setUserMuteAction } from "../actions/set-user-mute";

export function MuteUserButton({
  userId,
  initialIsMuted,
}: {
  userId: string;
  initialIsMuted: boolean;
}) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(initialIsMuted);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const nextIsMuted = !isMuted;
    setIsMuted(nextIsMuted);

    startTransition(async () => {
      try {
        const result = await setUserMuteAction({
          userId,
          muted: nextIsMuted,
        });

        if (!result.success) {
          setIsMuted(!nextIsMuted);
          toast.error(result.error ?? "Unable to update feed preferences.");
          return;
        }

        toast.success(
          nextIsMuted
            ? "Pins hidden from your feed."
            : "Pins restored to your feed.",
        );
        router.refresh();
      } catch {
        setIsMuted(!nextIsMuted);
        toast.error("Unable to update feed preferences.");
      }
    });
  }

  return (
    <Button
      type="button"
      variant={isMuted ? "secondary" : "outline"}
      aria-pressed={isMuted}
      disabled={isPending}
      onClick={handleToggle}
    >
      {isPending
        ? "Updating..."
        : isMuted
          ? "Show Pins in feed"
          : "Hide Pins from feed"}
    </Button>
  );
}
