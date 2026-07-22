import { notFound } from "next/navigation";

import { ProfileGrid } from "@/components/profile/profile-grid";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";

import {
  getProfileByUsername,
  getProfilePosts,
} from "@/lib/db/queries/profiles";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({
  params,
}: ProfilePageProps) {
  const { username } = await params;

  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const pins = await getProfilePosts(profile.id);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="space-y-10">
        <ProfileHeader profile={profile} />

        <ProfileStats
          pinCount={pins.length}
          joinedAt={profile.createdAt}
        />

        <ProfileGrid pins={pins} />
      </div>
    </main>
  );
}