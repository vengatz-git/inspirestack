interface ProfileStatsProps {
  pinCount: number;
  joinedAt: Date;
}

export function ProfileStats({
  pinCount,
  joinedAt,
}: ProfileStatsProps) {
  return (
    <section className="rounded-3xl border bg-card p-6">
      <div className="grid grid-cols-2 divide-x">
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-3xl font-bold">
            {pinCount}
          </span>

          <span className="text-sm text-muted-foreground">
            {pinCount === 1 ? "Pin" : "Pins"}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-lg font-semibold">
            {joinedAt.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <span className="text-sm text-muted-foreground">
            Joined
          </span>
        </div>
      </div>
    </section>
  );
}