import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/auth";

import {
  getProfileStatsService,
  ProfileContent,
  ProfileHeader,
  ProfileInfo,
  ProfileStats,
  ProfileTabs,
} from "@/features/profile";

import {
  getProfileByUsername,
  getProfileMetadataByUsername,
} from "@/features/profile/services/get-profile-by-username";
import { getGoogleImageService } from "@/features/profile/services/get-google-image";

import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { getUserPinsService } from "@/features/pin/services/get-pins-by-user";
import { getSavedPinsByUserService } from "@/features/profile/services/get-saved-pins-by-user";
import { getRecentBoardsService } from "@/features/board/services/get-recent-boards";
import { ProfileQuickAccess } from "@/features/profile/components/profile-quick-access";
import { ProfileAction } from "@/features/profile/components/profile-action";
import { getIsFollowingService } from "@/features/profile/services/follow-user";

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

export async function generateMetadata({
  params,
}: Pick<ProfilePageProps, "params">): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileMetadataByUsername(username);

  if (!profile) {
    return {
      title: "Profile not found | InspireStack",
      robots: { index: false, follow: false },
    };
  }

  const title = profile.displayName?.trim() || `@${profile.username}`;
  const description =
    profile.bio?.trim() || `View ${title}'s public profile on InspireStack.`;

  return {
    title: `${title} | InspireStack`,
    description,
    alternates: {
      canonical: `/profile/${profile.username}`,
    },
    robots: {
      index: profile.allowSearchEngineIndexing,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "website",
      ...(profile.image
        ? { images: [{ url: profile.image, alt: title }] }
        : {}),
    },
  };
}

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

  const session = await auth();
  const stats = await getProfileStatsService(profile.id, session?.user?.id);

  const isOwner = session?.user.id === profile.id;
  const isFollowing =
    session?.user?.id && !isOwner
      ? await getIsFollowingService(session.user.id, profile.id)
      : false;

  const googleImage = isOwner
    ? ((await getGoogleImageService(profile.id))?.googleImage ?? null)
    : null;

  const quickAccessBoards = await getRecentBoardsService({
    ownerId: profile.id,
    limit: 4,
    includePrivate: isOwner,
  });

  const pinsResult =
    activeTab === "pins"
      ? await getUserPinsService({
          userId: profile.id,
          viewerUserId: session?.user?.id ?? null,
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
        <div className="space-y-0">
          <div className="grid gap-6 px-1 pb-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:px-6 md:pb-8">
            <ProfileHeader
              profile={profile}
              isOwner={isOwner}
              googleImage={googleImage}
              currentUserId={session?.user?.id ?? null}
              isFollowing={isFollowing}
            />

            <div className="flex w-full flex-col gap-4 md:w-auto">
              <ProfileStats
                stats={stats}
                username={profile.username}
                currentUserId={session?.user?.id ?? null}
              />
              {!isOwner && (
                <div className="w-full md:hidden [&_button]:w-full">
                  <ProfileAction
                    profile={profile}
                    isOwner={isOwner}
                    currentUserId={session?.user?.id ?? null}
                    isFollowing={isFollowing}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-t">
            <div className="grid gap-6 px-1 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:px-6 md:py-8">
              <ProfileInfo profile={profile} isOwner={isOwner} />

              <ProfileQuickAccess boards={quickAccessBoards} />
            </div>
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