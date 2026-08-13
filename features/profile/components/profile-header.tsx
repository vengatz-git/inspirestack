import Image from "next/image";

import { Button } from "@/components/ui/button";

import type { Profile } from "../types/profile";

import { EditProfileDialog } from "./edit-profile-dialog";

type ProfileHeaderProps = {
  profile: Profile;
  isOwner: boolean;
};

export function ProfileHeader({
  profile,
  isOwner,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full">
        <Image
          src={profile.image ?? "/default-avatar.png"}
          alt={profile.username}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold">
        {profile.displayName ?? profile.username}
      </h1>

      <p className="text-muted-foreground">
        @{profile.username}
      </p>

      {isOwner ? (
        <EditProfileDialog profile={profile} />
      ) : (
        <Button>Follow</Button>
      )}
    </div>
  );
}