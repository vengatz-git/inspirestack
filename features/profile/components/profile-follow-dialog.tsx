"use client";

import { useCallback, useEffect, useState } from "react";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useNotificationStream,
  type NotificationStreamEvent,
} from "@/features/notification/hooks/use-notification-stream";

import { ProfileFollowList } from "./profile-follow-list";

type FollowKind = "followers" | "following";

type FollowedProfile = {
  id: string;
  username: string | null;
  displayName: string | null;
  image: string | null;
  isFollowing: boolean;
};

type FollowListResult = {
  users: FollowedProfile[];
  nextCursor: string | null;
};

export function ProfileFollowDialog({
  currentUserId,
  followersCount,
  followingCount,
  username,
}: {
  currentUserId: string | null;
  followersCount: number;
  followingCount: number;
  username: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeKind, setActiveKind] = useState<FollowKind>("followers");
  const [profiles, setProfiles] = useState<FollowedProfile[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = activeKind === "followers" ? "Followers" : "Following";

  const loadPage = useCallback(
    async (cursor?: string, append = false) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setProfiles([]);
        setNextCursor(null);
      }

      setError(null);

      try {
        const searchParams = new URLSearchParams({ kind: activeKind });

        if (cursor) {
          searchParams.set("cursor", cursor);
        }

        const response = await fetch(
          `/api/profile/${encodeURIComponent(username)}/follows?${searchParams}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Could not load this list.");
        }

        const result = (await response.json()) as FollowListResult;
        setProfiles((current) =>
          append ? [...current, ...result.users] : result.users,
        );
        setNextCursor(result.nextCursor);
      } catch {
        setError("Could not load this list. Please try again.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [activeKind, username],
  );

  useEffect(() => {
    if (open) {
      void loadPage();
    }
  }, [loadPage, open]);

  const handleFollowUpdate = useCallback(
    (event: NotificationStreamEvent) => {
      if (event.type === "follow-updated" && open) {
        void loadPage();
      }
    },
    [loadPage, open],
  );

  useNotificationStream({
    enabled: open && Boolean(currentUserId),
    onNotification: handleFollowUpdate,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        className="min-w-16 px-2 text-center first:pl-1 last:pr-1 sm:min-w-20 sm:px-4 md:min-w-24 hover:opacity-75"
        aria-haspopup="dialog"
        onClick={() => {
          setActiveKind("followers");
          setOpen(true);
        }}
      >
        <span className="block text-xl font-bold">{followersCount}</span>
        <span className="block whitespace-nowrap text-xs text-muted-foreground">
          Followers
        </span>
      </button>

      <button
        type="button"
        className="min-w-16 px-2 text-center first:pl-1 last:pr-1 sm:min-w-20 sm:px-4 md:min-w-24 hover:opacity-75"
        aria-haspopup="dialog"
        onClick={() => {
          setActiveKind("following");
          setOpen(true);
        }}
      >
        <span className="block text-xl font-bold">{followingCount}</span>
        <span className="block whitespace-nowrap text-xs text-muted-foreground">
          Following
        </span>
      </button>

      <DialogContent
        showCloseButton={false}
        className="flex max-h-[80vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-md"
      >
        <DialogHeader className="border-b px-5 py-4">
          <DialogTitle className="sr-only">
            @{username} followers and following
          </DialogTitle>
          <DialogDescription className="sr-only">
            View and follow people connected to @{username}.
          </DialogDescription>

          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label={`Connections for @${username}`}
              className="grid min-w-0 flex-1 grid-cols-2 rounded-xl bg-muted p-1"
            >
              <button
                type="button"
                aria-pressed={activeKind === "followers"}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeKind === "followers"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") {
                    setActiveKind("following");
                  }
                }}
                onClick={() => setActiveKind("followers")}
              >
                <span>Followers</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {followersCount}
                </span>
              </button>

              <button
                type="button"
                aria-pressed={activeKind === "following"}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeKind === "following"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    setActiveKind("followers");
                  }
                }}
                onClick={() => setActiveKind("following")}
              >
                <span>Following</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {followingCount}
                </span>
              </button>
            </div>

            <DialogClose
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Close connections dialog"
                  className="shrink-0 rounded-xl border border-border/60"
                />
              }
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-1 text-sm text-muted-foreground">
            {activeKind === "followers"
              ? "People who follow you."
              : "People you follow."}
          </p>

          {error ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">{error}</p>
              <button
                type="button"
                onClick={() => void loadPage()}
                className="mt-3 text-sm font-medium underline underline-offset-4"
              >
                Retry
              </button>
            </div>
          ) : loading && profiles.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Loading {title.toLowerCase()}...
            </p>
          ) : (
            <ProfileFollowList
              profiles={profiles}
              currentUserId={currentUserId}
              loadingMore={loadingMore}
              hasMore={Boolean(nextCursor)}
              emptyMessage={
                activeKind === "followers"
                  ? "No followers yet."
                  : "Not following anyone yet."
              }
              onLoadMore={() => {
                if (nextCursor) {
                  void loadPage(nextCursor, true);
                }
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}