import type { BoardSummary } from "@/features/board/types/board";
import type { PinCardData } from "@/features/pin/types/pin-card";

import type { ProfileTab } from "../constants/profile-tabs";

import { EmptyProfileContent } from "./empty-profile-content";
import { ProfilePinGrid } from "./profile-pin-grid";
import { ProfileBoardGrid } from "./profile-board-grid";

interface ProfileContentProps {
  activeTab: ProfileTab;
  pins: PinCardData[];
  savedPins: PinCardData[];
  boards: BoardSummary[];
  isOwner: boolean;
}

export function ProfileContent({
  activeTab,
  pins,
  savedPins,
  boards,
  isOwner,
}: ProfileContentProps) {
  if (activeTab === "boards") {
    if (boards.length === 0) {
      return (
        <EmptyProfileContent
          title="No Boards Yet"
          description="This user hasn't created any boards yet."
        />
      );
    }

    return (
      <ProfileBoardGrid
        boards={boards}
        isOwner={isOwner}
      />
    );
  }

  if (activeTab === "saved") {
    if (savedPins.length === 0) {
      return (
        <EmptyProfileContent
          title="Nothing Saved Yet"
          description="This user hasn't saved any pins yet."
        />
      );
    }

    return <ProfilePinGrid pins={savedPins} />;
  }

  if (pins.length === 0) {
    return (
      <EmptyProfileContent
        title="No Pins Yet"
        description="This user hasn't shared any inspiration yet."
      />
    );
  }

  return <ProfilePinGrid pins={pins} />;
}