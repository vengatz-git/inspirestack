import Link from "next/link";
import { CalendarDays, Hash, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/profile/profile-card";

import type { PinWithProfile } from "@/types/pin-with-profile";

interface PinInfoProps {
  pin: PinWithProfile;
}

export function PinInfo({
  pin,
}: PinInfoProps) {
  return (
    <div className="space-y-8">
      {/* Creator */}
      <ProfileCard profile={pin.profile} />

      {/* Title + Description */}
      <div className="space-y-4">
        <h1
          className="
            text-3xl
            font-bold
            leading-tight
            tracking-tight
          "
        >
          {pin.title}
        </h1>

        {pin.description && (
          <p
            className="
              text-base
              leading-7
              text-muted-foreground
            "
          >
            {pin.description}
          </p>
        )}

        {/* Category */}
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />

          <Link
            href={`/category/${encodeURIComponent(
              pin.category.toLowerCase()
            )}`}
          >
            <Badge
              variant="secondary"
              className="
                cursor-pointer
                rounded-full
                px-3
                py-1
                transition-colors
                hover:bg-primary
                hover:text-primary-foreground
              "
            >
              {pin.category}
            </Badge>
          </Link>
        </div>

        {/* Tags */}
        {pin.tags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" />
              <span>Tags</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {pin.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(
                    tag.toLowerCase()
                  )}`}
                >
                  <Badge
                    variant="outline"
                    className="
                      cursor-pointer
                      rounded-full
                      px-3
                      py-1
                      transition-colors
                      hover:bg-primary
                      hover:text-primary-foreground
                    "
                  >
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div
        className="
          flex
          items-center
          gap-3
          text-sm
          text-muted-foreground
        "
      >
        <CalendarDays className="h-4 w-4" />

        <span>
          Published{" "}
          {pin.createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Comments Placeholder */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Comments
        </h2>

        <div
          className="
            rounded-2xl
            border
            bg-muted/30
            p-5
          "
        >
          <p className="font-medium">
            Coming Soon 🚀
          </p>

          <p
            className="
              mt-2
              text-sm
              text-muted-foreground
            "
          >
            InspireStack focuses on visual discovery.
            Comments will be added in a future version.
          </p>
        </div>
      </section>
    </div>
  );
}