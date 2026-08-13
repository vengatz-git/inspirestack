import Image from "next/image";

import type { Profile } from "../types/profile";

type ProfileHeaderProps = {
  profile: Profile;
};

export function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  return (
    <div className="flex min-w-0 items-end gap-4 max-md:flex-col max-md:items-center max-md:text-center md:-translate-x-1 md:flex-row">
      <div className="relative -mt-14 h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted sm:-mt-16 sm:h-36 sm:w-36 md:-mt-20 md:h-44 md:w-44">
        <Image
          src={profile.image ?? "/default-avatar.png"}
          alt={profile.username}
          fill
          sizes="176px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 pb-1">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {profile.displayName ?? profile.username}
        </h1>

        <p className="text-muted-foreground">
          @{profile.username}
        </p>
      </div>
    </div>
  );
}