import Link from "next/link";

export function LandingFooter() {
  return (
    <footer id="footer" className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-bold tracking-tight">
              InspireStack
            </Link>

            <p className="text-muted-foreground mt-3 text-sm leading-6">
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

        <div className="text-muted-foreground mt-10 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} InspireStack. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>

            <Link href="#" className="hover:text-foreground transition-colors">
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

      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
