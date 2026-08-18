import type { BoardSummary } from "@/features/board/types/board";
import type { ProfilePinCardData } from "../types/profile-pin-card";

import type { ProfileTab } from "../constants/profile-tabs";

import { EmptyProfileContent } from "./empty-profile-content";
import { ProfileBoardGrid } from "./profile-board-grid";
import { ProfilePinsClient } from "./profile-pins-client";
import { ProfileSavedPinsClient } from "./profile-saved-pins-client";

interface ProfileContentProps {
  activeTab: ProfileTab;

  pins: ProfilePinCardData[];
  pinsCursor: string | null;

  savedPins: ProfilePinCardData[];
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
  return (
    <section className="pt-2">
      {activeTab === "boards" && (
        <ProfileBoardGrid
          boards={boards}
          isOwner={isOwner}
        />
      )}

      {activeTab === "saved" && (
        <>
          {savedPins.length === 0 ? (
            <EmptyProfileContent
              title="No Saved Pins Yet"
              description="This user hasn't saved any inspiration yet."
            />
          ) : (
            <ProfileSavedPinsClient
              username={username}
              initialPins={savedPins}
              initialCursor={savedPinsCursor}
            />
          )}
        </>
      )}

      {activeTab === "pins" && (
        <>
          {pins.length === 0 ? (
            <EmptyProfileContent
              title="No Pins Yet"
              description="This user hasn't shared any inspiration yet."
            />
          ) : (
            <ProfilePinsClient
              username={username}
              initialPins={pins}
              initialCursor={pinsCursor}
            />
          )}
        </>
      )}
    </section>
  );
}