import React from "react";
type ProfileStatsProps = {
  pins: number;
  followers: number;
  following: number;
  collections: number;
};

export function ProfileStats({
  pins,
  followers,
  following,
  collections,
}: ProfileStatsProps) {
  const stats = [
    { label: "Pins", value: pins },
    { label: "Followers", value: followers },
    { label: "Following", value: following },
    { label: "Collections", value: collections },
  ];

  return (
    <section className="mt-8 border-y py-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}