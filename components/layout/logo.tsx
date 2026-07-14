import Link from "next/link";

import { siteConfig } from "@/constants/site";

interface LogoProps {
  showText?: boolean;
}

export function Logo({ showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} Home`}
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
        <div className="grid grid-cols-2 gap-0.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-background" />
          <span className="h-2.5 w-2.5 rounded-sm bg-background/80" />
          <span className="h-2.5 w-2.5 rounded-sm bg-background/80" />
          <span className="h-2.5 w-2.5 rounded-sm bg-background" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>

          <span className="text-xs text-muted-foreground">
            {siteConfig.description}
          </span>
        </div>
      )}
    </Link>
  );
}