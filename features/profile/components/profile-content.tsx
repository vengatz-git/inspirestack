import { EmptyProfileContent } from "./empty-profile-content";
import { ProfilePinGrid } from "./profile-pin-grid";

import type { PinCardData } from "@/features/pin/types/pin-card";

interface ProfileContentProps {
  pins: PinCardData[];
}

export function ProfileContent({
  pins,
}: ProfileContentProps) {
  if (pins.length === 0) {
    return <EmptyProfileContent />;
  }

  return <ProfilePinGrid pins={pins} />;
}