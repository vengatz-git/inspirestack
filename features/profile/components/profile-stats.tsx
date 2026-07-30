import type { ProfileStats as ProfileStatsData } from "../types/profile-stats";

type ProfileStatsProps = {
  stats: ProfileStatsData;
  collections: number;
};

export function ProfileStats({
  stats,
  collections,
}: ProfileStatsProps) {
  const items = [
    {
      label: "Pins",
      value: stats.posts,
    },
    {
      label: "Followers",
      value: stats.followers,
    },
    {
      label: "Following",
      value: stats.following,
    },
    {
      label: "Collections",
      value: collections,
    },
  ];

  return (
    <section className="mt-8 border-y py-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="text-center"
          >
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-muted-foreground text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}