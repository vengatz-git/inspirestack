import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoIconProps {
  className?: string;
}

/**
 * Modern SVG Logo Mark for InspireStack:
 * Represents stacked layers of inspiration cards topped with a creative spark.
 */
export function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8 shrink-0 transition-transform duration-200 group-hover:scale-105", className)}
      aria-hidden="true"
    >
      {/* Background Badge with smooth rounded corners */}
      <rect
        width="32"
        height="32"
        rx="9"
        className="fill-primary"
      />

      {/* Subtle inner highlight border */}
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        className="stroke-primary-foreground/15"
      />

      {/* Bottom Stack Layer */}
      <path
        d="M8.5 20.5L16 24.5L23.5 20.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground/45"
      />

      {/* Middle Stack Layer */}
      <path
        d="M8.5 15.75L16 19.75L23.5 15.75"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground/75"
      />

      {/* Top Floating Diamond Card */}
      <path
        d="M16 6.5L23.5 11L16 15.5L8.5 11L16 6.5Z"
        className="fill-primary-foreground shadow-sm"
      />

      {/* Inspiration Spark Motif in the top card */}
      <path
        d="M16 8.5V13.5M13.5 11H18.5"
        className="stroke-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="11" r="0.75" className="fill-primary" />
    </svg>
  );
}

interface LogoProps {
  href?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  /**
   * If true, text is always hidden.
   */
  iconOnly?: boolean;
  /**
   * If true, text is always visible across all device sizes (e.g. for footers).
   */
  alwaysShowText?: boolean;
}

/**
 * Responsive Logo component for InspireStack:
 * - Mobile / narrow foldables (< 540px): Shows ONLY the logo icon to preserve space for navigation & search.
 * - Foldables unfolded / Tablets / Laptops / Desktops (>= 540px): Shows Logo Icon + Text.
 * - If alwaysShowText is true: Shows both icon and text on all screen sizes.
 */
export function Logo({
  href = "/feed",
  className,
  iconClassName,
  textClassName,
  iconOnly = false,
  alwaysShowText = false,
}: LogoProps) {
  const content = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoIcon className={iconClassName} />
      {!iconOnly && (
        <span
          className={cn(
            "font-bold tracking-tight text-foreground transition-colors sm:text-xl",
            alwaysShowText ? "inline-block" : "hidden min-[540px]:inline-block",
            textClassName
          )}
        >
          InspireStack
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="InspireStack Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
