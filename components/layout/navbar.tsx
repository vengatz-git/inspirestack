import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { AuthControls } from "./auth-controls";

import { SearchBar } from "@/components/search/search-bar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-6 px-6">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <SearchBar />

        {/* Navigation */}
        <div className="flex flex-1 justify-center">
          <NavLinks />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AuthControls />
        </div>
      </div>
    </header>
  );
}