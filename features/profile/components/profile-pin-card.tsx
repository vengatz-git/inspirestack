"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deletePinAction } from "@/features/pin/actions/delete-pin";

import type { ProfilePinCardData } from "../types/profile-pin-card";

interface ProfilePinCardProps {
  pin: ProfilePinCardData;
  onDeleted?: (pinId: string) => void;
  showDelete?: boolean;
}

export function ProfilePinCard({
  pin,
  onDeleted,
  showDelete = false,
}: ProfilePinCardProps) {
  async function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
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

  const profilePinHref = pin.author.username
    ? `/profile/${pin.author.username}/pin/${pin.id}`
    : `/pin/${pin.id}`;

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

        {showDelete && pin.isOwner && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-background/90 hover:bg-background absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors"
            aria-label="Delete pin"
          >
            <Trash2 className="text-destructive size-3.5" />
          </button>
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

          {/* Likes will be added when the reaction system exists. */}
          <span
            className="text-muted-foreground shrink-0 text-xs"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}