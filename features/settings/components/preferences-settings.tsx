"use client";

import { useState, useTransition } from "react";
import { Bell, Check, Eye, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { updateUserSettingsAction } from "../actions/update-user-settings";
import type { UserSettings } from "../schemas/user-settings-schema";

const notificationOptions = [
  {
    key: "notifyComments",
    label: "Comments on your Pins",
    description: "When someone comments on one of your Pins.",
  },
  {
    key: "notifyReplies",
    label: "Replies to your comments",
    description: "When someone replies to a comment you wrote.",
  },
  {
    key: "notifySaves",
    label: "Saves",
    description: "When someone saves one of your Pins.",
  },
  {
    key: "notifyLikes",
    label: "Likes",
    description: "When someone likes one of your Pins.",
  },
  {
    key: "notifyFollows",
    label: "New followers",
    description: "When someone starts following you.",
  },
] as const satisfies ReadonlyArray<{
  key: keyof UserSettings;
  label: string;
  description: string;
}>;

function VisibilityChoice({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: "PUBLIC" | "PRIVATE";
  onChange: (value: "PUBLIC" | "PRIVATE") => void;
}) {
  return (
    <fieldset className="rounded-2xl border p-4">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {([
          ["PUBLIC", "Public", Eye],
          ["PRIVATE", "Private", LockKeyhole],
        ] as const).map(([option, optionLabel, Icon]) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                selected
                  ? "border-primary bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="size-4" />
              {optionLabel}
              {selected ? <Check className="size-3.5" /> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PreferencesSettings({
  initialSettings,
}: {
  initialSettings: UserSettings;
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(initialSettings);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isDirty = Object.keys(settings).some(
    (key) =>
      settings[key as keyof UserSettings] !==
      savedSettings[key as keyof UserSettings],
  );

  function saveSettings() {
    startTransition(async () => {
      const result = await updateUserSettingsAction(settings);

      if (!result.success) {
        toast.error(result.error ?? "Could not save your settings.");
        return;
      }

      setSavedSettings(settings);
      router.refresh();
      toast.success("Settings saved.");
    });
  }

  return (
    <section
      id="preferences"
      className="scroll-mt-28 rounded-3xl border bg-background p-5 shadow-sm sm:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl">
          <Bell className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Preferences</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Choose which in-app alerts you receive and set visibility defaults
            for new content.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-8">
        <fieldset>
          <legend className="text-sm font-semibold">In-app notifications</legend>
          <p className="text-muted-foreground mt-1 text-sm">
            These settings apply to future alerts shown in InspireStack.
          </p>
          <div className="mt-3 divide-y rounded-2xl border px-4">
            {notificationOptions.map((option) => (
              <label
                key={option.key}
                className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-3"
              >
                <span>
                  <span className="block text-sm font-medium">
                    {option.label}
                  </span>
                  <span className="text-muted-foreground mt-0.5 block text-xs leading-5">
                    {option.description}
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={settings[option.key]}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      [option.key]: event.target.checked,
                    }))
                  }
                  className="size-4 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold">New content defaults</legend>
          <p className="text-muted-foreground mt-1 text-sm">
            You can still change visibility for each Pin or Board as you create
            it.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <VisibilityChoice
              label="New Pins"
              description="Who can see Pins you publish."
              value={settings.defaultPinVisibility}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  defaultPinVisibility: value,
                }))
              }
            />
            <VisibilityChoice
              label="New Boards"
              description="Who can see Boards you create."
              value={settings.defaultBoardVisibility}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  defaultBoardVisibility: value,
                }))
              }
            />
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end border-t pt-5">
        <Button
          type="button"
          disabled={!isDirty || isPending}
          onClick={saveSettings}
          className="min-w-32 rounded-xl"
        >
          {isPending ? "Saving..." : "Save preferences"}
        </Button>
      </div>
    </section>
  );
}