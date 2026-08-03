"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SignOutButton } from "../../features/auth/components/sign-out-button";

interface ProfileDropdownUser {
  username: string;
  name: string | null;
  image: string | null;
}

interface ProfileDropdownProps {
  user: ProfileDropdownUser;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const initialSource = user.name ?? user.username;
  const avatarInitial = initialSource.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open profile menu"
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Avatar>
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name ?? user.username} />
          ) : null}
          <AvatarFallback>{avatarInitial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          render={<Link href={`/profile/${user.username}`} />}
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/settings" />}>
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}