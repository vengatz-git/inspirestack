import type { Profile } from "../types/profile";

type ProfileInfoProps = {
  profile: Profile;
};

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <section className="space-y-3 text-center">
      {profile.bio && (
        <p className="max-w-2xl mx-auto">{profile.bio}</p>
      )}

      {profile.website && (
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {profile.website}
        </a>
      )}

      {profile.location && (
        <p className="text-muted-foreground">
          {profile.location}
        </p>
      )}
    </section>
  );
}