// features/profile/components/follow-button.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { followUserAction } from "../actions/follow-user";
import { unfollowUserAction } from "../actions/unfollow-user";

export function FollowButton({
  userId,
  initialIsFollowing,
}: {
  userId: string;
  initialIsFollowing: boolean;
}) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing, userId]);

  function handleToggle() {
    const nextIsFollowing = !isFollowing;
    setIsFollowing(nextIsFollowing);

    startTransition(async () => {
      try {
        const result = nextIsFollowing
          ? await followUserAction({ userId })
          : await unfollowUserAction({ userId });

        if (!result.success) {
          setIsFollowing(!nextIsFollowing);
          toast.error(result.error ?? "Unable to update follow status.");
          return;
        }

        router.refresh();
      } catch {
        setIsFollowing(!nextIsFollowing);
        toast.error("Unable to update follow status.");
      }
    });
  }

  return (
    <Button
      type="button"
      variant={isFollowing ? "outline" : "default"}
      aria-pressed={isFollowing}
      disabled={isPending}
      onClick={handleToggle}
    >
      {isPending
        ? "Updating..."
        : isFollowing
          ? "Following"
          : "Follow"}
    </Button>
  );
}