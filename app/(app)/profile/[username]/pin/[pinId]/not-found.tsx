import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProfilePinNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Pin not found
      </h1>

      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
        This pin may have been deleted, moved, or the link is incorrect.
      </p>

      <Link href="/feed" className="mt-6">
        <Button type="button">Explore inspiration</Button>
      </Link>
    </main>
  );
}
