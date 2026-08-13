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
    label: "Collections",
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
      <nav
        aria-label="Profile content"
        className="flex overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <Link
              key={tab.value}
              href={`/profile/${username}?tab=${tab.value}`}
              aria-current={isActive ? "page" : undefined}
              className={[
                "relative shrink-0 px-5 py-3 text-sm font-medium transition-colors sm:px-8 sm:py-4",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {tab.label}

              {isActive && (
                <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-primary sm:inset-x-6" />
              )}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}