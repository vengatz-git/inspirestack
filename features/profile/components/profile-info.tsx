import { Globe2, MapPin } from "lucide-react";

import type { Profile } from "../types/profile";

import { EditProfileDialog } from "./edit-profile-dialog";

type ProfileInfoProps = {
  profile: Profile;
  isOwner: boolean;
};

export function ProfileInfo({
  profile,
  isOwner,
}: ProfileInfoProps) {
  const hasDetails =
    Boolean(profile.bio) ||
    Boolean(profile.website) ||
    Boolean(profile.location);

  if (!hasDetails && !isOwner) {
    return null;
  }

  return (
    <section className="group relative min-w-0">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
          About
        </h2>

        {isOwner && (
          <div className="opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
            <EditProfileDialog profile={profile} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {profile.bio && (
          <p className="max-w-2xl text-base leading-7 whitespace-pre-line">
            {profile.bio}
          </p>
        )}

        {(profile.website || profile.location) && (
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center gap-2 font-medium hover:underline"
              >
                <Globe2 className="size-4 shrink-0" />
                <span className="truncate">{profile.website}</span>
              </a>
            )}

            {profile.location && (
              <span className="text-muted-foreground inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                <span>{profile.location}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}