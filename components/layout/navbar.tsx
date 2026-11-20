import Link from "next/link";

import { auth } from "@/auth";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import { SearchForm } from "@/features/search/components/search-form";
import { Logo } from "@/components/shared/logo";

import { NotificationDropdown } from "@/features/notification/components/notification-dropdown";
import { getUnreadNotificationCount } from "@/features/notification/actions/get-unread-notification-count";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  const unreadCount = user?.id ? await getUnreadNotificationCount() : 0;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6">
        {/* Left */}
        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <Logo href="/feed" />

          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            <Link
              href="/feed"
              className="rounded-xl px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/create"
              className="rounded-xl px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Create
            </Link>
          </nav>
        </div>

        {/* Center */}
        <div className="min-w-0 flex-1">
          <SearchForm />
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-1">
          {user?.id ? (
            <NotificationDropdown initialUnreadCount={unreadCount} />
          ) : null}

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
