import { Button } from "@/components/ui/button";
import Link from "next/link";

import type { Profile } from "../types/profile";

import { EditProfileDialog } from "./edit-profile-dialog";
import { FollowButton } from "./follow-button";

type ProfileActionProps = {
  profile: Profile;
  isOwner: boolean;
  currentUserId: string | null;
  isFollowing: boolean;
};

export function ProfileAction({
  profile,
  isOwner,
  currentUserId,
  isFollowing,
}: ProfileActionProps) {
  if (isOwner) {
    return <EditProfileDialog profile={profile} />;
  }

  if (!currentUserId) {
    return (
      <Button render={<Link href="/login" />}>
        Follow
      </Button>
    );
  }

  return (
    <FollowButton
      userId={profile.id}
      initialIsFollowing={isFollowing}
    />
  );
}