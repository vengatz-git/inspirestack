import type { BoardSummary } from "@/features/board/types/board";
import type { PinCardData } from "@/features/pin/types/pin-card";

import type { ProfileTab } from "../constants/profile-tabs";

import { EmptyProfileContent } from "./empty-profile-content";
import { ProfilePinGrid } from "./profile-pin-grid";

interface ProfileContentProps {
  activeTab: ProfileTab;
  pins: PinCardData[];
  boards: BoardSummary[];
}

export function ProfileContent({
  activeTab,
  pins,
  boards,
}: ProfileContentProps) {
  if (activeTab === "boards") {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Boards will go here.
      </div>
    );
  }

  if (activeTab === "saved") {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Saved pins will go here.
      </div>
    );
  }

  if (pins.length === 0) {
    return <EmptyProfileContent />;
  }

  return <ProfilePinGrid pins={pins} />;
}