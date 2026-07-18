import { ReactNode } from "react";

interface PinSidebarProps {
  actions: ReactNode;
  info: ReactNode;
}

export function PinSidebar({
  actions,
  info,
}: PinSidebarProps) {
  return (
    <div
      className="
        flex
        h-full
        flex-col
      "
    >
      <div
        className="
          border-b
          p-6
        "
      >
        {actions}
      </div>

      <div
        className="
          flex-1
          overflow-y-auto
        "
      >
        <div
          className="
            p-6
          "
        >
          {info}
        </div>
      </div>
    </div>
  );
}