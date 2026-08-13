import type { BoardSummary } from "@/features/board/types/board";
import type { PinCardData } from "@/features/pin/types/pin-card";

import type { ProfileTab } from "../constants/profile-tabs";

import { EmptyProfileContent } from "./empty-profile-content";
import { ProfileBoardGrid } from "./profile-board-grid";
import { ProfilePinsClient } from "./profile-pins-client";
import { ProfileSavedPinsClient } from "./profile-saved-pins-client";

interface ProfileContentProps {
  activeTab: ProfileTab;

  pins: PinCardData[];
  pinsCursor: string | null;

  savedPins: PinCardData[];
  savedPinsCursor: string | null;

  boards: BoardSummary[];

  isOwner: boolean;
  username: string;
}

export function ProfileContent({
  activeTab,
  pins,
  pinsCursor,
  savedPins,
  savedPinsCursor,
  boards,
  isOwner,
  username,
}: ProfileContentProps) {
  if (activeTab === "boards") {
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
          title="No Saved Pins Yet"
          description="This user hasn't saved any inspiration yet."
        />
      );
    }

    return (
      <ProfileSavedPinsClient
        username={username}
        initialPins={savedPins}
        initialCursor={savedPinsCursor}
      />
    );
  }

  if (pins.length === 0) {
    return (
      <EmptyProfileContent
        title="No Pins Yet"
        description="This user hasn't shared any inspiration yet."
      />
    );
  }

  return (
    <ProfilePinsClient
      username={username}
      initialPins={pins}
      initialCursor={pinsCursor}
    />
  );
}