import { Button } from "@/components/ui/button";
import Link from "next/link";

import type { Profile } from "../types/profile";

import { EditProfileDialog } from "./edit-profile-dialog";
import { FollowButton } from "./follow-button";
import { MuteUserButton } from "./mute-user-button";

type ProfileActionProps = {
  profile: Profile;
  isOwner: boolean;
  currentUserId: string | null;
  isFollowing: boolean;
  isMuted: boolean;
};

export function ProfileAction({
  profile,
  isOwner,
  currentUserId,
  isFollowing,
  isMuted,
}: ProfileActionProps) {
  if (isOwner) {
    return <EditProfileDialog profile={profile} />;
  }

  if (!currentUserId) {
    return <Button render={<Link href="/login" />}>Follow</Button>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <FollowButton userId={profile.id} initialIsFollowing={isFollowing} />
      <MuteUserButton
        key={`${profile.id}:${isMuted}`}
        userId={profile.id}
        initialIsMuted={isMuted}
      />
    </div>
  );
}
