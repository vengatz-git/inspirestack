import { EmptyProfileContent } from "./empty-profile-content";
import { ProfilePinGrid } from "@/features/pin";

import type { Pin } from "@/db/schema";

type ProfileContentProps = {
  pins: Pin[];
};

export function ProfileContent({
  pins,
}: ProfileContentProps) {
  if (pins.length === 0) {
    return <EmptyProfileContent />;
  }

  return <ProfilePinGrid pins={pins} />;
}