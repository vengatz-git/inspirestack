"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function AuthControls() {
  const { isSignedIn, isLoaded } = useUser();

  // Prevent hydration flicker while Clerk loads
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>

        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <UserButton
    //   afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: "h-10 w-10",
        },
      }}
    />
  );
}