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

      <div className="scrollbar-none -mx-1 flex gap-4 overflow-x-auto px-1 pb-3">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="w-45 shrink-0 sm:w-47.5"
          >
            <ProfilePinCard pin={pin} />
          </div>
        ))}
      </div>
    </section>
  );
}