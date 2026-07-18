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
        rounded-3xl
        border
        bg-card
        shadow-sm
        lg:grid
        lg:grid-cols-[minmax(0,1fr)_420px]
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          bg-muted/20
          p-6
          lg:h-[min(85vh,900px)]
        "
      >
        {image}
      </div>

      <aside
        className="
          border-t
          lg:border-t-0
          lg:border-l
          overflow-y-auto
          lg:h-[min(85vh,900px)]
        "
      >
        {sidebar}
      </aside>
    </section>
  );
}