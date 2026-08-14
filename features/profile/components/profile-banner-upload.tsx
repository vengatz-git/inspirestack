"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateProfileImageAction } from "../actions/update-profile-image";
import { ProfileBannerAmbientGlow } from "./profile-banner-ambient-glow";

type ProfileBannerUploadProps = {
  imageUrl: string | null;
};

export function ProfileBannerUpload({
  imageUrl,
}: ProfileBannerUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);

    try {
      const result = await updateProfileImageAction(
        "banner",
        file,
      );

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Profile banner updated.");
      router.refresh();
    } catch {
      toast.error("Failed to update profile banner.");
    } finally {
      setIsUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="relative">
      {imageUrl && (
        <ProfileBannerAmbientGlow imageUrl={imageUrl} />
      )}

      <section className="group relative h-28 w-full overflow-hidden rounded-2xl bg-muted sm:h-32 md:h-36 md:rounded-3xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="absolute top-3 right-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/55 text-white transition-opacity hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-60 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          aria-label="Change profile banner"
        >
          <Camera className="size-4" />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isUploading}
          onChange={handleChange}
        />
      </section>
    </div>
  );
}