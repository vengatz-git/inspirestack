import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <div className="mb-8 flex items-center gap-4">
      <Avatar className="size-12">
        <AvatarImage src={pin.author.image ?? undefined} />

        <AvatarFallback>
          {initials.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-semibold">
          {pin.author.name ?? "Unknown User"}
        </p>

        <p className="text-muted-foreground text-sm">
          @{pin.author.username ?? "unknown"}
        </p>
      </div>
    </div>
  );
}