import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import type { Profile } from "@/types/pin-with-profile";

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({
  profile,
}: ProfileCardProps) {
  const fallback =
    profile.displayName?.charAt(0).toUpperCase() ??
    profile.username.charAt(0).toUpperCase();

  return (
    <Link
      href={`/profile/${profile.username}`}
      className="flex items-center justify-between rounded-2xl border bg-card p-4 transition-all hover:bg-muted/40 hover:shadow-sm"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={profile.imageUrl ?? ""}
            alt={profile.displayName}
          />

          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold">
            {profile.displayName}
          </h3>

          <p className="text-sm text-muted-foreground">
            @{profile.username}
          </p>
        </div>
      </div>

      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        View Profile →
      </span>
    </Link>
  );
}