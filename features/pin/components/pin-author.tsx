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
  const username =
    pin.author.username ?? "unknown";

  const initials =
    pin.author.username?.charAt(0) ?? "?";

  const profileHref = `/profile/${pin.author.username}`;

  return (
    <section>
      <Link
        href={profileHref}
        aria-label={`View ${username}'s profile`}
        className="group inline-flex items-center gap-3"
      >
        <Avatar className="size-10 transition-opacity group-hover:opacity-90">
          <AvatarImage src={pin.author.image ?? undefined} />

          <AvatarFallback className="text-sm font-semibold">
            {initials.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className="max-w-48 truncate text-sm font-semibold transition-opacity group-hover:opacity-80">
          {username}
        </span>
      </Link>
    </section>
  );
}