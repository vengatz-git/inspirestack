import { ReactNode } from "react";

interface PinLayoutProps {
  image: ReactNode;
  sidebar: ReactNode;
}

export function PinLayout({
  image,
  sidebar,
}: PinLayoutProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-[32px]
        border
        bg-card
        shadow-xl
      "
    >
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-start
          lg:justify-center
        "
      >
        {/* Image */}
        <div
          className="
            flex
            justify-center
            p-4
            md:p-6
            lg:flex-1
          "
        >
          {image}
        </div>

        {/* Sidebar */}
        <aside
          className="
            w-full
            border-t
            bg-background
            lg:w-[420px]
            lg:border-l
            lg:border-t-0
            lg:sticky
            lg:top-20
            lg:self-start
          "
        >
          {sidebar}
        </aside>
      </div>
    </section>
  );
}