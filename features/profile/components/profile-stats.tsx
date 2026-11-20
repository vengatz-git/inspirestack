// features/profile/components/profile-stats.tsx
import type { ProfileStats as ProfileStatsData } from "../types/profile-stats";
import { ProfileFollowDialog } from "./profile-follow-dialog";

type ProfileStatsProps = {
  stats: ProfileStatsData;
  username: string;
  currentUserId: string | null;
};

export function ProfileStats({
  stats,
  username,
  currentUserId,
}: ProfileStatsProps) {
  return (
    <section>
      <div className="grid grid-cols-3 divide-x">
        <div className="min-w-16 px-2 text-center first:pl-1 last:pr-1 sm:min-w-20 sm:px-4 md:min-w-24">
          <p className="text-xl font-bold">{stats.posts}</p>
          <p className="whitespace-nowrap text-xs text-muted-foreground">
            Posted Pins
          </p>
        </div>

        <ProfileFollowDialog
          currentUserId={currentUserId}
          followersCount={stats.followers}
          followingCount={stats.following}
          username={username}
        />
      </div>
    </section>
  );
}