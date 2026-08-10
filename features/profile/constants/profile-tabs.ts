export const PROFILE_TABS = [
  "pins",
  "boards",
  "saved",
] as const;

export type ProfileTab =
  (typeof PROFILE_TABS)[number];

export function isProfileTab(
  value: string | undefined,
): value is ProfileTab {
  return (
    value !== undefined &&
    PROFILE_TABS.includes(
      value as ProfileTab,
    )
  );
}