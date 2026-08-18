import { ProfilePinCard } from "./profile-pin-card";

import type { ProfilePinCardData } from "../types/profile-pin-card";

interface ProfilePinGridProps {
  pins: ProfilePinCardData[];
  onDeleted?: (pinId: string) => void;
}

export function ProfilePinGrid({
  pins,
  onDeleted,
}: ProfilePinGridProps) {
  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2">
        {pins.map((pin) => (
          <ProfilePinCard
            key={pin.id}
            pin={pin}
            onDeleted={onDeleted}
          />
        ))}
      </div>
    </section>
  );
}