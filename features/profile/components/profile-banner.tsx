import Image from "next/image";

import type { Profile } from "../types/profile";

import { ProfileBannerUpload } from "./profile-banner-upload";
import { ProfileBannerAmbientGlow } from "./profile-banner-ambient-glow";

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
    <div className="relative">
      {profile.bannerImage && (
        <ProfileBannerAmbientGlow
          imageUrl={profile.bannerImage}
        />
      )}

      <section className="group relative h-40 w-full overflow-hidden rounded-2xl bg-muted sm:h-44 md:h-56 md:rounded-3xl">
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
    </div>
  );
}