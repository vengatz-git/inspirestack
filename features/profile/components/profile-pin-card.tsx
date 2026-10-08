"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import {
  BookmarkX,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { removeSavedPinAction } from "@/features/saved/actions/remove-saved-pin";
import { deletePinAction } from "@/features/pin/actions/delete-pin";

import type { ProfilePinCardData } from "../types/profile-pin-card";

interface ProfilePinCardProps {
  pin: ProfilePinCardData;
  onDeleted?: (pinId: string) => void;
  showDelete?: boolean;
  showRemoveSaved?: boolean;
  onDirectSaveRemoved?: (pinId: string) => void;
}

export function ProfilePinCard({
  pin,
  onDeleted,
  showDelete = false,
  showRemoveSaved = false,
  onDirectSaveRemoved,
}: ProfilePinCardProps) {
  const [isRemoving, startRemoving] = useTransition();

  async function handleDelete(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm(
      "Delete this pin? This will permanently remove the pin and its image.",
    );

    if (!confirmed) {
      return;
    }

    const result = await deletePinAction(pin.id);

    if (!result.success) {
      toast.error(
        result.error ?? "Failed to delete pin.",
      );
      return;
    }

    toast.success("Pin deleted.");
    onDeleted?.(pin.id);
  }

  function handleRemoveSaved(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (isRemoving) {
      return;
    }

    startRemoving(async () => {
      const result = await removeSavedPinAction({
        pinId: pin.id,
      });

      if (!result.success) {
        toast.error(
          result.error ?? "Failed to remove saved Pin.",
        );
        return;
      }

      toast.success("Removed from Saved.");
      onDirectSaveRemoved?.(pin.id);
    });
  }

  const profilePinHref = pin.author.username
    ? `/profile/${pin.author.username}/pin/${pin.id}`
    : `/pin/${pin.id}`;

  const showActions =
    (showRemoveSaved && pin.isDirectSave) ||
    (showDelete && pin.isOwner);

  return (
    <article className="group relative min-w-0">
      <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-xl">
        <Link
          href={profilePinHref}
          className="absolute inset-0"
          aria-label={
            pin.title
              ? `View ${pin.title}`
              : "View pin"
          }
        >
          <Image
            src={pin.imageUrl}
            alt={
              pin.altText ??
              pin.title ??
              "Pin image"
            }
            fill
            sizes="
              (max-width: 640px) 50vw,
              (max-width: 1024px) 33vw,
              20vw
            "
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {showActions && (
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            {showRemoveSaved && pin.isDirectSave && (
              <button
                type="button"
                onClick={handleRemoveSaved}
                disabled={isRemoving}
                className="bg-background/90 hover:bg-background flex size-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors disabled:opacity-50"
                aria-label="Remove from Saved"
              >
                <BookmarkX className="size-3.5" />
              </button>
            )}

            {showDelete && pin.isOwner && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-background/90 hover:bg-background flex size-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors"
                aria-label="Delete pin"
              >
                <Trash2 className="text-destructive size-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="min-w-0 px-1 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">
              {pin.title ?? "Untitled Pin"}
            </h3>

            {pin.description && (
              <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-5">
                {pin.description}
              </p>
            )}
          </div>

          <span
            className="text-muted-foreground shrink-0 text-xs"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}