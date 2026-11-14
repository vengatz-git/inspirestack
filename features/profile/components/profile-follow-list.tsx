// features/profile/components/profile-follow-list.tsx
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { FollowButton } from "./follow-button";

type FollowedProfile = {
  id: string;
  username: string | null;
  displayName: string | null;
  image: string | null;
  isFollowing: boolean;
};

export function ProfileFollowList({
  profiles,
  currentUserId,
  loadingMore,
  hasMore,
  emptyMessage,
  onLoadMore,
}: {
  profiles: FollowedProfile[];
  currentUserId: string | null;
  loadingMore: boolean;
  hasMore: boolean;
  emptyMessage: string;
  onLoadMore: () => void;
}) {
  return (
    <div>
      {profiles.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <ul className="divide-y">
          {profiles.map((profile) => {
            const name = profile.displayName ?? profile.username ?? "Member";
            const contents = (
              <>
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={profile.image ?? "/default-avatar.svg"}
                    alt={name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {name}
                  </span>
                  {profile.username ? (
                    <span className="block truncate text-xs text-muted-foreground">
                      @{profile.username}
                    </span>
                  ) : null}
                </span>
              </>
            );

            return (
              <li key={profile.id} className="flex items-center gap-3 py-3">
                {profile.username ? (
                  <Link
                    href={`/profile/${profile.username}`}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-lg hover:opacity-75"
                  >
                    {contents}
                  </Link>
                ) : (
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {contents}
                  </div>
                )}

                {currentUserId === profile.id ? null : currentUserId ? (
                  <FollowButton
                    key={`${profile.id}:${profile.isFollowing}`}
                    userId={profile.id}
                    initialIsFollowing={profile.isFollowing}
                  />
                ) : (
                  <Button render={<Link href="/login" />}>Follow</Button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {hasMore ? (
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          disabled={loadingMore}
          onClick={onLoadMore}
        >
          {loadingMore ? "Loading..." : "Load more"}
        </Button>
      ) : null}
    </div>
  );
} 