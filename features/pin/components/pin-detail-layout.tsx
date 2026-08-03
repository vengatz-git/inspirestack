import type { ReactNode } from "react";

interface PinDetailLayoutProps {
  workspace: ReactNode;
  sideFeed: ReactNode;
  feed: ReactNode;
}

export function PinDetailLayout({
  workspace,
  sideFeed,
  feed,
}: PinDetailLayoutProps) {
  return (
    <main className="mx-auto max-w-screen-2xl px-6 py-8">
      {/* Sticky Hero */}
      <section className="sticky top-24 z-10">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4">
            {workspace}
          </div>

          <aside className="col-span-1">
            {sideFeed}
          </aside>
        </div>
      </section>

      {/* Feed */}
      <section className="mt-8">
        {feed}
      </section>
    </main>
  );
}