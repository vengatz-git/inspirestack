import type { ProfilePinCardData } from "../types/profile-pin-card";

import { ProfilePinGrid } from "./profile-pin-grid";

interface ProfileMoreFromUserProps {
  username: string;
  pins: ProfilePinCardData[];
}

export function ProfileMoreFromUser({
  username,
  pins,
}: ProfileMoreFromUserProps) {
  if (pins.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          More from @{username}
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          More inspiration from this creator.
        </p>
      </div>

      <ProfilePinGrid pins={pins} />
    </section>
  );
}