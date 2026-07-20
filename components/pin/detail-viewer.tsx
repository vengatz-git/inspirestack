import { ReactNode } from "react";

interface DetailViewerProps {
  image: ReactNode;
  sidebar: ReactNode;
}

export function DetailViewer({
  image,
  sidebar,
}: DetailViewerProps) {
  return (
    <section className="overflow-hidden rounded-[32px] border bg-card shadow-xl">
      <div
        className="
          flex
          flex-col
          lg:h-[calc(100vh-12rem)]
          lg:min-h-[600px]
          lg:max-h-[760px]
          lg:flex-row
        "
      >
        {/* Image Viewer */}
        <div
          className="
            w-full
            border-b
            bg-gradient-to-br
            from-muted/40
            via-background
            to-muted/20
            p-6
            lg:basis-1/2
            lg:border-b-0
            lg:border-r
          "
        >
          {image}
        </div>

        {/* Sidebar */}
        <aside
          className="
            w-full
            overflow-y-auto
            bg-background
            lg:basis-1/2
          "
        >
          {sidebar}
        </aside>
      </div>
    </section>
  );
}