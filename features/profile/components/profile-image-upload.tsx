"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateProfileImageAction } from "../actions/update-profile-image";
import { ProfileMediaEditor } from "./profile-media-editor";

type ProfileImageUploadProps = {
  imageUrl: string | null;
  username: string;
};

export function ProfileImageUpload({
  imageUrl,
  username,
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedImage(previewUrl);

    event.target.value = "";
  }

  function handleCancel() {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
  }

  async function handleConfirm(file: File) {
    if (isUploading) {
      return;
    }

    setIsUploading(true);

    try {
      const result = await updateProfileImageAction("avatar", file);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Profile picture updated.");

      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }

      setSelectedImage(null);

      router.refresh();
    } catch {
      toast.error("Failed to update profile picture.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="group absolute inset-0 z-10 flex items-center justify-center rounded-full bg-transparent disabled:cursor-not-allowed md:hover:bg-black/45 md:focus-visible:bg-black/45"
        aria-label={`Change profile picture for ${username}`}
      >
        <span className="hidden size-10 items-center justify-center rounded-full bg-black/60 text-white md:flex md:opacity-0 md:transition-opacity md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          <Camera className="size-5" />
        </span>
      </button>

      <Image
        src={imageUrl ?? "/default-avatar.png"}
        alt={username}
        fill
        sizes="176px"
        className="object-cover"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isUploading}
        onChange={handleChange}
      />

      {selectedImage && (
        <ProfileMediaEditor
          imageUrl={selectedImage}
          aspect={1}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
