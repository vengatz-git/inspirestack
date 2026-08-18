"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import { Camera, ImagePlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteProfileImageAction } from "../actions/delete-profile-image";
import { restoreGoogleImageAction } from "../actions/restore-google-image";
import { updateProfileImageAction } from "../actions/update-profile-image";

import { ProfileMediaEditor } from "./profile-media-editor";

type ProfileImageUploadProps = {
  imageUrl: string | null;
  username: string;
  googleImage: string | null;
};

export function ProfileImageUpload({
  imageUrl,
  username,
  googleImage,
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const isBusy = isUploading || isDeleting || isRestoring;
  const hasImage = Boolean(imageUrl);
  const hasGoogleImage = Boolean(googleImage);

  function handleSelectFromDevice() {
    inputRef.current?.click();
  }

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
    if (isBusy) {
      return;
    }

    setIsUploading(true);

    try {
      const result = await updateProfileImageAction(
        "avatar",
        file,
      );

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

  async function handleDelete() {
    if (!hasImage || isBusy) {
      return;
    }

    const confirmed = window.confirm(
      "Delete your profile picture? You can choose another one later.",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteProfileImageAction("avatar");

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Profile picture deleted.");

      router.refresh();
    } catch {
      toast.error("Failed to delete profile picture.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleRestoreGoogle() {
    if (!hasGoogleImage || isBusy) {
      return;
    }

    setIsRestoring(true);

    try {
      const result = await restoreGoogleImageAction();

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Google profile picture restored.");

      router.refresh();
    } catch {
      toast.error("Failed to restore Google profile picture.");
    } finally {
      setIsRestoring(false);
    }
  }

  return (
    <>
      {hasImage && imageUrl ? (
        <Image
          src={imageUrl}
          alt={username}
          fill
          sizes="176px"
          className="object-cover"
        />
      ) : (
        <div className="bg-muted flex h-full w-full items-center justify-center">
          <ImagePlus className="text-muted-foreground size-10" />
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={isBusy}
          aria-label={
            hasImage
              ? `Profile picture actions for ${username}`
              : `Add profile picture for ${username}`
          }
          className="group absolute inset-0 z-20 flex items-center justify-center rounded-full bg-transparent outline-none disabled:cursor-not-allowed"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Camera className="size-5" />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          side="bottom"
          sideOffset={8}
          className="w-52"
        >
          <DropdownMenuItem onClick={handleSelectFromDevice}>
            <Camera />
            {hasImage ? "Change photo" : "Select from device"}
          </DropdownMenuItem>

          {hasGoogleImage && (
            <DropdownMenuItem onClick={handleRestoreGoogle}>
              <ImagePlus />
              {hasImage ? "Use Google photo" : "Restore Google photo"}
            </DropdownMenuItem>
          )}

          {hasImage && (
            <DropdownMenuItem
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 />
              Delete photo
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isBusy}
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