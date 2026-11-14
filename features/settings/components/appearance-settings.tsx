 "use client";

import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const themeOptions = [
  {
    value: "light",
    label: "Light",
    description: "A bright, focused workspace.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "A softer look for low-light spaces.",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Follow your device preference.",
    icon: Monitor,
  },
] as const;

export function AppearanceSettings() {
  const { setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const selectedTheme = mounted ? (theme ?? "system") : "system";

  return (
    <section className="rounded-3xl border bg-background p-5 shadow-sm sm:p-7">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl">
          <Palette className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Choose how InspireStack looks for you.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedTheme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setTheme(option.value)}
              className={`relative min-h-28 rounded-2xl border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "hover:border-foreground/20 hover:bg-muted/50"
              }`}
            >
              <span className="bg-muted flex size-9 items-center justify-center rounded-xl">
                <Icon className="size-4" />
              </span>
              <span className="mt-3 block text-sm font-medium">
                {option.label}
              </span>
              <span className="text-muted-foreground mt-1 block text-xs leading-5">
                {option.description}
              </span>
              {isSelected ? (
                <Check className="text-primary absolute top-4 right-4 size-4" />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}