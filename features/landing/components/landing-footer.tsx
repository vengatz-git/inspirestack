import Link from "next/link";

export function LandingFooter() {
  return (
    <footer id="footer" className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-bold tracking-tight">
              InspireStack
            </Link>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Discover ideas, save inspiration, and build collections around the
              things you love.
            </p>
          </div>

          <FooterColumn
            title="Explore"
            links={[
              ["Home", "/"],
              ["Explore", "/feed"],
              ["Search", "/search"],
            ]}
          />

          <FooterColumn
            title="Create"
            links={[
              ["Create a Pin", "/create"],
              ["Your Profile", "/profile"],
              ["Settings", "/settings"],
            ]}
          />

          <FooterColumn
            title="InspireStack"
            links={[
              ["Log in", "/login"],
              ["About", "#"],
              ["Help", "#"],
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} InspireStack. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="#" className="py-1 transition-colors hover:text-foreground">
              Privacy
            </Link>

            <Link href="#" className="py-1 transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: [string, string][];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>

      <ul className="mt-3 space-y-1">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="inline-block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
