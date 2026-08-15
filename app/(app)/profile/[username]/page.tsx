import { notFound } from "next/navigation";

import { auth } from "@/auth";

import {
  getProfileStatsService,
  ProfileBanner,
  ProfileContent,
  ProfileHeader,
  ProfileInfo,
  ProfileStats,
  ProfileTabs,
} from "@/features/profile";

import { getProfileByUsername } from "@/features/profile/services/get-profile-by-username";

import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { getUserPinsService } from "@/features/pin/services/get-pins-by-user";
import { getSavedPinsByUserService } from "@/features/profile/services/get-saved-pins-by-user";
import { getRecentBoardsService } from "@/features/board/services/get-recent-boards";
import { ProfileQuickAccess } from "@/features/profile/components/profile-quick-access";
import { ProfileAction } from "@/features/profile/components/profile-action";

import {
  isProfileTab,
  type ProfileTab,
} from "@/features/profile/constants/profile-tabs";

type ProfilePageProps = {
  params: Promise<{
    username: string;
  }>;

  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const { username } = await params;
  const { tab } = await searchParams;

  const activeTab: ProfileTab = isProfileTab(tab) ? tab : "pins";

  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const [stats, session] = await Promise.all([
    getProfileStatsService(profile.id),
    auth(),
  ]);

  const isOwner = session?.user.id === profile.id;

  const quickAccessBoards = await getRecentBoardsService({
    ownerId: profile.id,
    limit: 4,
    includePrivate: isOwner,
  });

  const pinsResult =
    activeTab === "pins"
      ? await getUserPinsService({
          userId: profile.id,
          limit: 24,
        })
      : {
          pins: [],
          nextCursor: null,
        };

  const boards =
    activeTab === "boards"
      ? await getBoardsByUserService({
          userId: profile.id,
          includePrivate: isOwner,
        })
      : [];

  const savedPinsResult =
    activeTab === "saved"
      ? await getSavedPinsByUserService({
          userId: profile.id,
          includePrivate: isOwner,
        })
      : {
          pins: [],
          nextCursor: null,
        };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-0 pb-6 sm:px-6 sm:pt-0 sm:pb-8">
      <div className="space-y-0">
        <div className="relative">
          <section className="relative min-h-100 rounded-2xl sm:min-h-110 md:min-h-120 md:rounded-3xl">
            <div className="absolute inset-0">
              <ProfileBanner profile={profile} isOwner={isOwner} />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-[35%] overflow-hidden rounded-b-2xl md:rounded-b-3xl"
            >
              <div className="from-background/45 via-background/10 absolute inset-0 bg-linear-to-t to-transparent backdrop-blur-[3px]" />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-8">
              <div className="flex flex-col gap-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] md:flex-row md:items-end md:justify-between md:gap-10">
                <ProfileHeader profile={profile} isOwner={isOwner} />

                <div className="shrink-0">
                  <ProfileStats stats={stats} />
                </div>
              </div>

              {!isOwner && (
                <div className="mt-4 w-full md:hidden [&_button]:w-full">
                  <ProfileAction profile={profile} isOwner={isOwner} />
                </div>
              )}
            </div>
          </section>

          <div className="grid gap-6 px-1 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:px-6 md:py-8">
            <ProfileInfo profile={profile} isOwner={isOwner} />

            <ProfileQuickAccess boards={quickAccessBoards} />
          </div>
        </div>

        <ProfileTabs
          username={profile.username ?? username}
          activeTab={activeTab}
        />

        <div className="pt-6">
          <ProfileContent
            activeTab={activeTab}
            pins={pinsResult.pins}
            pinsCursor={pinsResult.nextCursor}
            savedPins={savedPinsResult.pins}
            savedPinsCursor={savedPinsResult.nextCursor}
            boards={boards}
            isOwner={isOwner}
            username={profile.username ?? username}
          />
        </div>
      </div>
    </main>
  );
}
