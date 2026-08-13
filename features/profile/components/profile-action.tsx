import { Button } from "@/components/ui/button";

import type { Profile } from "../types/profile";

import { EditProfileDialog } from "./edit-profile-dialog";

type ProfileActionProps = {
  profile: Profile;
  isOwner: boolean;
};

export function ProfileAction({
  profile,
  isOwner,
}: ProfileActionProps) {
  if (isOwner) {
    return <EditProfileDialog profile={profile} />;
  }

  return <Button>Follow</Button>;
}