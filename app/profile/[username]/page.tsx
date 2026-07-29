import { notFound } from "next/navigation";

import { auth } from "@/auth";
import {
  ProfileBanner,
  ProfileContent,
  ProfileHeader,
  ProfileInfo,
  ProfileStats,
  ProfileTabs,
  getProfileByUsername,
} from "@/features/profile";

type ProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function ProfilePage({
  params,
}: ProfilePageProps) {
  const { username } = await params;

  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const session = await auth();

  const isOwner = session?.user.id === profile.id;

  return (
    <main className="container mx-auto max-w-6xl space-y-8 py-8">
      <ProfileBanner />

      <ProfileHeader
        profile={profile}
        isOwner={isOwner}
      />

      <ProfileInfo profile={profile} />

      <ProfileStats
        pins={0}
        followers={0}
        following={0}
        collections={0}
      />

      <ProfileTabs />

      <ProfileContent />
    </main>
  );
}