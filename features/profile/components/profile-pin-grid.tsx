import { ProfilePinCard } from "./profile-pin-card";

import type { ProfilePinCardData } from "../types/profile-pin-card";

interface ProfilePinGridProps {
  pins: ProfilePinCardData[];
  onDeleted?: (pinId: string) => void;
  showDelete?: boolean;
}

export function ProfilePinGrid({
  pins,
  onDeleted,
  showDelete = false,
}: ProfilePinGridProps) {
  return (
    <section>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pins.map((pin) => (
          <ProfilePinCard
            key={pin.id}
            pin={pin}
            onDeleted={onDeleted}
            showDelete={showDelete}
          />
        ))}
      </div>
    </section>
  );
}