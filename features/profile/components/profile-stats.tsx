import type { ProfileStats as ProfileStatsData } from "../types/profile-stats";

type ProfileStatsProps = {
  stats: ProfileStatsData;
};

export function ProfileStats({
  stats,
}: ProfileStatsProps) {
  const items = [
    {
      label: "Posted Pins",
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
  ];

  return (
    <section className="rounded-2xl border px-5 py-4 md:mr-6">
      <div className="grid grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="min-w-20 text-center"
          >
            <p className="text-2xl font-bold">
              {item.value}
            </p>

            <p className="text-muted-foreground whitespace-nowrap text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}