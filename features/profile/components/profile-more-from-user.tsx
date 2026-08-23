import type { ProfilePinCardData } from "../types/profile-pin-card";

import { ProfilePinCard } from "./profile-pin-card";

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
    <section className="mx-auto mt-8 w-full max-w-5xl">
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          More from @{username}
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          More inspiration from this creator.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pins.map((pin) => (
          <ProfilePinCard key={pin.id} pin={pin} />
        ))}
      </div>
    </section>
  );
}