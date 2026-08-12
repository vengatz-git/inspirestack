import { notFound } from "next/navigation";

import { auth } from "@/auth";

import {
  getProfileByUsername,
  getProfileStatsService,
  ProfileBanner,
  ProfileContent,
  ProfileHeader,
  ProfileInfo,
  ProfileStats,
  ProfileTabs,
} from "@/features/profile";

import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { getUserPinsService } from "@/features/pin/services/get-pins-by-user";
import { getSavedPinsByUserService } from "@/features/profile/services/get-saved-pins-by-user";

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

  const activeTab: ProfileTab = isProfileTab(tab)
    ? tab
    : "pins";

  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const [stats, session] = await Promise.all([
    getProfileStatsService(profile.id),
    auth(),
  ]);

  const isOwner = session?.user.id === profile.id;

  const pins =
    activeTab === "pins"
      ? await getUserPinsService(profile.id)
      : [];

  const boards =
    activeTab === "boards"
      ? await getBoardsByUserService({
          userId: profile.id,
          includePrivate: isOwner,
        })
      : [];

  const savedPins =
    activeTab === "saved"
      ? await getSavedPinsByUserService({
          userId: profile.id,
          includePrivate: isOwner,
        })
      : [];

  return (
    <main className="container mx-auto max-w-6xl space-y-8 py-8">
      <ProfileBanner />

      <ProfileHeader
        profile={profile}
        isOwner={isOwner}
      />

      <ProfileInfo profile={profile} />

      <ProfileStats
        stats={stats}
        collections={0}
      />

      <ProfileTabs
        username={profile.username ?? username}
        activeTab={activeTab}
      />

      <ProfileContent
        activeTab={activeTab}
        pins={pins}
        savedPins={savedPins}
        boards={boards}
        isOwner={isOwner}
      />
    </main>
  );
}