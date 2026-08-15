import Image from "next/image";

import type { Profile } from "../types/profile";

import { ProfileAction } from "./profile-action";
import { ProfileImageUpload } from "./profile-image-upload";

type ProfileHeaderProps = {
  profile: Profile;
  isOwner: boolean;
};

export function ProfileHeader({
  profile,
  isOwner,
}: ProfileHeaderProps) {
  return (
    <div className="flex min-w-0 items-end gap-5 max-md:flex-col max-md:items-center max-md:text-center md:flex-row">
      <div className="border-background bg-muted relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 sm:h-40 sm:w-40 md:h-52 md:w-52">
        {isOwner ? (
          <ProfileImageUpload
            imageUrl={profile.image}
            username={profile.username}
          />
        ) : (
          <Image
            src={profile.image ?? "/default-avatar.png"}
            alt={profile.username}
            fill
            sizes="192px"
            className="object-cover"
          />
        )}
      </div>

      <div className="min-w-0 pb-1">
        <div className="flex items-center gap-5 max-md:justify-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {profile.displayName ?? profile.username}
          </h1>

          {!isOwner && (
            <div className="hidden md:block">
              <ProfileAction
                profile={profile}
                isOwner={isOwner}
              />
            </div>
          )}
        </div>

        <p className="text-muted-foreground">
          @{profile.username}
        </p>
      </div>
    </div>
  );
}