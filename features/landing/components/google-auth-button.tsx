"use client";

import { signIn } from "next-auth/react";
import { Globe } from "lucide-react";
import { useState } from "react";

export function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);

    await signIn("google", {
      redirectTo: "/onboarding",
    });
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isLoading}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border bg-background text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Globe className="size-5" />

      {isLoading
        ? "Connecting..."
        : "Continue with Google"}
    </button>
  );
}