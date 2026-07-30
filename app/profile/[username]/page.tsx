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
import { getUserPinsService } from "@/features/pin";

type ProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const stats = await getProfileStatsService(profile.id);

  const pins = await getUserPinsService(profile.id);

  const session = await auth();

  const isOwner = session?.user.id === profile.id;

  return (
    <main className="container mx-auto max-w-6xl space-y-8 py-8">
      <ProfileBanner />

      <ProfileHeader profile={profile} isOwner={isOwner} />

      <ProfileInfo profile={profile} />

      <ProfileStats stats={stats} collections={0} />

      <ProfileTabs />

      <ProfileContent pins={pins} />
    </main>
  );
}
