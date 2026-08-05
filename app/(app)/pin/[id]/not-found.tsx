import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Pin not found
          </h1>

          <p className="text-muted-foreground">
            This pin may have been deleted or the link is incorrect.
          </p>
        </div>

        <Link href="/feed">
          <Button size="lg">
            Discover more Pins
          </Button>
        </Link>
      </div>
    </main>
  );
}