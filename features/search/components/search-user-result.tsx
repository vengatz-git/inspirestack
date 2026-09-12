import Image from "next/image";
import Link from "next/link";

import type { SearchUser } from "../types/search";

interface SearchUserResultProps {
  user: SearchUser;
}

export function SearchUserResult({
  user,
}: SearchUserResultProps) {
  return (
    <Link
      href={`/profile/${user.username}`}
      className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
    >
      <div className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-full">
        <Image
          src={user.image ?? "/default-avatar.png"}
          alt={user.displayName ?? user.username}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">
          {user.displayName ?? user.username}
        </p>

        <p className="text-muted-foreground truncate text-sm">
          @{user.username}
        </p>
      </div>
    </Link>
  );
}