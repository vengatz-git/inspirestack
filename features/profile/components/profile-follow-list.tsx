import Image from "next/image";
import Link from "next/link";

type FollowedProfile = {
  id: string;
  username: string | null;
  displayName: string | null;
  image: string | null;
};

export function ProfileFollowList({
  title,
  username,
  profiles,
  nextCursor,
}: {
  title: string;
  username: string;
  profiles: FollowedProfile[];
  nextCursor: string | null;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href={`/profile/${username}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Back to @{username}
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>

      {profiles.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No {title.toLowerCase()} yet.
        </p>
      ) : (
        <ul className="mt-5 divide-y rounded-xl border">
          {profiles.map((profile) => {
            const name = profile.displayName ?? profile.username ?? "Member";
            const contents = (
              <>
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={profile.image ?? "/default-avatar.svg"}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {name}
                  </span>
                  {profile.username ? (
                    <span className="block truncate text-xs text-muted-foreground">
                      @{profile.username}
                    </span>
                  ) : null}
                </span>
              </>
            );

            return (
              <li key={profile.id}>
                {profile.username ? (
                  <Link
                    href={`/profile/${profile.username}`}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50"
                  >
                    {contents}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 p-4">
                    {contents}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {nextCursor ? (
        <Link
          href={`?cursor=${encodeURIComponent(nextCursor)}`}
          className="mt-5 inline-flex rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Load more
        </Link>
      ) : null}
    </main>
  );
}