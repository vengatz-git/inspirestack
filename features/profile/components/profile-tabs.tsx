import Link from "next/link";

import type { ProfileTab } from "../constants/profile-tabs";

interface ProfileTabsProps {
  username: string;
  activeTab: ProfileTab;
}

const tabs = [
  {
    label: "Pins",
    value: "pins",
  },
  {
    label: "Boards",
    value: "boards",
  },
  {
    label: "Saved",
    value: "saved",
  },
] as const;

export function ProfileTabs({
  username,
  activeTab,
}: ProfileTabsProps) {
  return (
    <section className="border-b">
      <nav className="flex items-center justify-center gap-2">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <Link
              key={tab.value}
              href={`/profile/${username}?tab=${tab.value}`}
              className={
                isActive
                  ? "rounded-none border-b-2 border-primary px-6 py-2 font-medium"
                  : "rounded-none border-b-2 border-transparent px-6 py-2 text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}