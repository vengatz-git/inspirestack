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
}

export function ProfilePinCard({ pin, onDeleted }: ProfilePinCardProps) {
  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
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
      toast.error(result.error ?? "Failed to delete pin.");
      return;
    }

    toast.success("Pin deleted.");

    onDeleted?.(pin.id);
  }

  const profilePinHref = pin.author.username
    ? `/profile/${pin.author.username}/pin/${pin.id}`
    : `/pin/${pin.id}`;

  return (
    <article className="group bg-card relative overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg">
      <Link
        href={profilePinHref}
        className="block"
        aria-label={pin.title ? `View ${pin.title}` : "View pin"}
      >
        <div className="grid grid-cols-[180px_minmax(0,1fr)]">
          <div className="bg-muted relative aspect-square overflow-hidden">
            <Image
              src={pin.imageUrl}
              alt={pin.altText ?? pin.title ?? "Pin image"}
              fill
              sizes="180px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>

          <div className="flex min-w-0 flex-col p-5">
            <div className="min-w-0 pr-2">
              <h3 className="line-clamp-2 text-base font-semibold">
                {pin.title ?? "Untitled Pin"}
              </h3>

              {pin.description && (
                <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-6">
                  {pin.description}
                </p>
              )}
            </div>

            <div className="mt-auto pt-5">
              <div className="flex min-w-0 items-center gap-2">
                {pin.author.image ? (
                  <Image
                    src={pin.author.image}
                    alt={pin.author.username ?? "Author"}
                    width={28}
                    height={28}
                    className="size-7 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-muted size-7 shrink-0 rounded-full" />
                )}

                <span className="text-muted-foreground truncate text-xs">
                  {pin.author.displayName ??
                    pin.author.username ??
                    "Unknown user"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {pin.isOwner && (
        <button
          type="button"
          onClick={handleDelete}
          className="bg-background/90 hover:bg-background absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors"
          aria-label="Delete pin"
        >
          <Trash2 className="text-destructive size-4" />
        </button>
      )}
    </article>
  );
}
