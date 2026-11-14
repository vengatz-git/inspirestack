import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  LogOut,
  Palette,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";

import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/features/auth/actions/sign-out";
import { EditProfileDialog } from "@/features/profile/components/edit-profile-dialog";
import { getProfileByUsername } from "@/features/profile/services/get-profile-by-username";
import { AppearanceSettings } from "@/features/settings/components/appearance-settings";
import { PreferencesSettings } from "@/features/settings/components/preferences-settings";
import type { UserSettings } from "@/features/settings/schemas/user-settings-schema";

const settingsLinks = [
  { href: "#profile", label: "Profile", icon: UserRound },
  { href: "#preferences", label: "Preferences", icon: SlidersHorizontal },
  { href: "#appearance", label: "Appearance", icon: Palette },
  { href: "#session", label: "Session", icon: LogOut },
];

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (!session.user.isOnboarded) {
    redirect("/onboarding");
  }

  const user = session.user;
  const profile = user.username
    ? await getProfileByUsername(user.username)
    : null;
  const displayName =
    profile?.displayName || user.name || user.username || "InspireStack user";
  const avatarInitial = displayName.trim().charAt(0).toUpperCase() || "I";
  const settings: UserSettings = {
    notifyComments: user.notifyComments,
    notifyReplies: user.notifyReplies,
    notifySaves: user.notifySaves,
    notifyLikes: user.notifyLikes,
    notifyFollows: user.notifyFollows,
    defaultPinVisibility: user.defaultPinVisibility,
    defaultBoardVisibility: user.defaultBoardVisibility,
  };

  return (
    <main className="mx-auto w-full max-w-6xl pb-10">
      <Link
        href="/feed"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to feed
      </Link>

      <header className="mt-8 max-w-2xl">
        <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
          Your workspace
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Settings
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base">
          Manage your profile, preferences, appearance, and current session.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-muted-foreground mb-3 hidden px-3 text-xs font-semibold tracking-[0.16em] uppercase lg:block">
            On this page
          </p>
          <nav
            aria-label="Settings sections"
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
          >
            {settingsLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="bg-background text-muted-foreground hover:bg-muted hover:text-foreground inline-flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors lg:border-transparent lg:bg-transparent"
              >
                <Icon className="size-4" />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 space-y-6">
          <section
            id="profile"
            className="scroll-mt-28 overflow-hidden rounded-3xl border bg-background shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b p-5 sm:p-7">
              <div className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <UserRound className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold">Profile & account</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Keep your public identity up to date.
                  </p>
                </div>
              </div>

              {user.username ? (
                <Link
                  href={`/profile/${user.username}`}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors"
                >
                  View public profile
                  <ExternalLink className="size-3.5" />
                </Link>
              ) : null}
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar className="size-16 ring-1 ring-border" size="lg">
                  {user.image || profile?.image ? (
                    <AvatarImage
                      src={user.image ?? profile?.image ?? undefined}
                      alt={displayName}
                    />
                  ) : null}
                  <AvatarFallback className="text-lg">
                    {avatarInitial}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-semibold">{displayName}</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {user.username ? `@${user.username}` : "Username not set"}
                  </p>
                </div>

                {profile ? (
                  <EditProfileDialog
                    profile={profile}
                    triggerLabel="Edit profile"
                  />
                ) : null}
              </div>

              <div className="mt-6 grid gap-3 border-t pt-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-muted/45 px-4 py-3">
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Username
                  </p>
                  <p className="mt-1 truncate text-sm font-medium">
                    {user.username ? `@${user.username}` : "Not set"}
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/45 px-4 py-3">
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Email
                  </p>
                  <p className="mt-1 truncate text-sm font-medium">
                    {user.email ?? "No email on file"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <PreferencesSettings initialSettings={settings} />

          <div id="appearance" className="scroll-mt-28">
            <AppearanceSettings />
          </div>

          <section
            id="session"
            className="scroll-mt-28 rounded-3xl border border-destructive/20 bg-background p-5 shadow-sm sm:p-7"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="bg-destructive/10 text-destructive mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <LogOut className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold">Session</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Sign out of InspireStack on this device.
                  </p>
                </div>
              </div>

              <form action={signOutAction}>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
                >
                  <LogOut className="size-4" />
                  Sign out
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}