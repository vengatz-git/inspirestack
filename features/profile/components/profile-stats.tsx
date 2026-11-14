import Link from "next/link";

import type { ProfileStats as ProfileStatsData } from "../types/profile-stats";

type ProfileStatsProps = {
  stats: ProfileStatsData;
  username: string;
};

export function ProfileStats({
  stats,
  username,
}: ProfileStatsProps) {
  const items = [
    {
      label: "Posted Pins",
      value: stats.posts,
    },
    {
      label: "Followers",
      value: stats.followers,
      href: `/profile/${username}/followers`,
    },
    {
      label: "Following",
      value: stats.following,
      href: `/profile/${username}/following`,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-3 divide-x">
        {items.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="min-w-24 px-4 text-center first:pl-2 last:pr-2 hover:opacity-75"
            >
              <p className="text-xl font-bold">{item.value}</p>
              <p className="whitespace-nowrap text-xs text-muted-foreground">
                {item.label}
              </p>
            </Link>
          ) : (
            <div
              key={item.label}
              className="min-w-24 px-4 text-center first:pl-2 last:pr-2"
            >
              <p className="text-xl font-bold">{item.value}</p>
              <p className="whitespace-nowrap text-xs text-muted-foreground">
                {item.label}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}