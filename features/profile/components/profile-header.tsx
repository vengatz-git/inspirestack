import Image from "next/image";

import type { Profile } from "../types/profile";

import { ProfileAction } from "./profile-action";
import { ProfileImageUpload } from "./profile-image-upload";
type ProfileHeaderProps = {
  profile: Profile;
  isOwner: boolean;
};

export function ProfileHeader({ profile, isOwner }: ProfileHeaderProps) {
  return (
    <div className="flex min-w-0 items-end gap-4 max-md:flex-col max-md:items-center max-md:text-center md:translate-x-4 md:flex-row">
      <div className="border-background bg-muted relative -mt-16 h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 sm:-mt-18 sm:h-36 sm:w-36 md:-mt-22 md:h-44 md:w-44">
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
            sizes="176px"
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
              <ProfileAction profile={profile} isOwner={isOwner} />
            </div>
          )}
        </div>

        <p className="text-muted-foreground">@{profile.username}</p>
      </div>
    </div>
  );
}
