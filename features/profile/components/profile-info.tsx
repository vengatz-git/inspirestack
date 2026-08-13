import type { Profile } from "../types/profile";

type ProfileInfoProps = {
  profile: Profile;
};

export function ProfileInfo({
  profile,
}: ProfileInfoProps) {
  const hasDetails =
    Boolean(profile.bio) ||
    Boolean(profile.website) ||
    Boolean(profile.location);

  if (!hasDetails) {
    return null;
  }

  return (
    <section className="min-w-0 space-y-5">
      {profile.bio && (
        <p className="max-w-2xl text-base leading-7">
          {profile.bio}
        </p>
      )}

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            {profile.website}
          </a>
        )}

        {profile.location && (
          <span className="text-muted-foreground">
            {profile.location}
          </span>
        )}
      </div>
    </section>
  );
}