import { ProfileCard } from "@/components/profile/profile-card";
import type { PinWithProfile } from "@/types/pin-with-profile";

interface PinInfoProps {
  pin: PinWithProfile;
}

export function PinInfo({ pin }: PinInfoProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {pin.title}
        </h1>

        {pin.description && (
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            {pin.description}
          </p>
        )}
      </div>

      <div className="border-t" />

      <div className="space-y-6">
        <ProfileCard profile={pin.profile} />

        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Published
          </span>{" "}
          {pin.createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}