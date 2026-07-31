import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { getPinByIdService } from "../services/get-pin-by-id";

type Pin = NonNullable<
  Awaited<ReturnType<typeof getPinByIdService>>
>;

type PinAuthorProps = {
  pin: Pin;
};

export function PinAuthor({
  pin,
}: PinAuthorProps) {
  const initials =
    pin.author.name?.charAt(0) ??
    pin.author.username?.charAt(0) ??
    "?";

  const profileHref = `/profile/${pin.author.username}`;

  return (
    <section>
      <div className="flex items-center gap-4">
        <Link
          href={profileHref}
          aria-label={`View ${pin.author.name ?? pin.author.username}'s profile`}
        >
          <Avatar className="size-14 transition-opacity hover:opacity-90">
            <AvatarImage src={pin.author.image ?? undefined} />

            <AvatarFallback className="text-base font-semibold">
              {initials.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="min-w-0">
          <Link
            href={profileHref}
            className="block transition-opacity hover:opacity-80"
          >
            <h2 className="truncate text-lg font-semibold">
              {pin.author.name ?? "Unknown User"}
            </h2>
          </Link>

          <p className="truncate text-sm text-muted-foreground">
            @{pin.author.username ?? "unknown"}
          </p>
        </div>
      </div>
    </section>
  );
}