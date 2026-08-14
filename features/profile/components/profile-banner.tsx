import Image from "next/image";

import type { Profile } from "../types/profile";

import { ProfileBannerUpload } from "./profile-banner-upload";

type ProfileBannerProps = {
  profile: Profile;
  isOwner: boolean;
};

export function ProfileBanner({
  profile,
  isOwner,
}: ProfileBannerProps) {
  if (isOwner) {
    return (
      <ProfileBannerUpload
        imageUrl={profile.bannerImage}
      />
    );
  }

  return (
    <section className="relative h-28 w-full overflow-hidden rounded-2xl bg-muted sm:h-32 md:h-36 md:rounded-3xl">
      {profile.bannerImage ? (
        <Image
          src={profile.bannerImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
    </section>
  );
}