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
        bg-background
        lg:max-h-[calc(100vh-7rem)]
      "
    >
      {/* Actions */}
      <div
        className="
          sticky
          top-0
          z-20
          bg-background
          border-b
          px-6
          py-5
          "
      >
        {actions}
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto px-6 py-6"
        >
        {info}
      </div>
    </div>
  );
}