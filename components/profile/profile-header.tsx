import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Profile } from "@/types/pin-with-profile";

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  const fallback =
    profile.displayName?.charAt(0).toUpperCase() ??
    profile.username.charAt(0).toUpperCase();

  return (
    <section className="rounded-3xl border bg-card p-8">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-32 w-32 border">
          <AvatarImage
            src={profile.imageUrl ?? ""}
            alt={profile.displayName}
          />

          <AvatarFallback className="text-4xl font-bold">
            {fallback}
          </AvatarFallback>
        </Avatar>

        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          {profile.displayName}
        </h1>

        <p className="mt-2 text-lg text-muted-foreground">
          @{profile.username}
        </p>

        {profile.bio && (
          <p className="mt-6 max-w-2xl text-muted-foreground">
            {profile.bio}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {profile.location && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{profile.location}</span>
            </div>
          )}

          {profile.website && (
            <Link
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <span>🔗</span>
              <span>Website</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}