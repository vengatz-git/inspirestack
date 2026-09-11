import Link from "next/link";

import { auth } from "@/auth";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import { SearchForm } from "@/features/search/components/search-form";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Left */}
        <div className="flex shrink-0 items-center gap-6">
          <Link
            href="/feed"
            className="text-xl font-bold"
          >
            InspireStack
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/feed">Home</Link>
            <Link href="/create">Create</Link>
          </nav>
        </div>

        {/* Center */}
        <div className="min-w-0 flex-1">
          <SearchForm />
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center">
          {user?.username ? (
            <ProfileDropdown
              user={{
                username: user.username,
                name: user.name ?? null,
                image: user.image ?? null,
              }}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}