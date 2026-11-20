"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, PlusCircle, Search, User } from "lucide-react";

interface MobileNavProps {
  username?: string | null;
}

export function MobileNav({ username }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/feed",
      label: "Home",
      icon: Home,
      isActive: pathname === "/feed" || pathname === "/",
    },
    {
      href: "/search",
      label: "Search",
      icon: Search,
      isActive: pathname.startsWith("/search"),
    },
    {
      href: "/create",
      label: "Create",
      icon: PlusCircle,
      isActive: pathname.startsWith("/create"),
    },
    {
      href: "/notifications",
      label: "Updates",
      icon: Bell,
      isActive: pathname.startsWith("/notifications"),
    },
    ...(username
      ? [
          {
            href: `/profile/${username}`,
            label: "Profile",
            icon: User,
            isActive: pathname.startsWith(`/profile/${username}`),
          },
        ]
      : []),
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur-md md:hidden"
    >
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map(({ href, label, icon: Icon, isActive }) => (
          <Link
            key={href}
            href={href}
            className={`flex min-h-[44px] flex-1 flex-col items-center justify-center py-1 text-xs font-medium transition-colors ${
              isActive
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon
              className={`size-5 ${
                isActive ? "stroke-[2.5]" : "stroke-[1.75]"
              }`}
            />
            <span className="mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
