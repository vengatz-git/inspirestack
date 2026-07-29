import { Button } from "@/components/ui/button";

const tabs = [
  {
    label: "Pins",
    value: "pins",
  },
  {
    label: "Saved",
    value: "saved",
  },
  {
    label: "Collections",
    value: "collections",
  },
] as const;

export function ProfileTabs() {
  return (
    <section className="border-b">
      <nav className="flex items-center justify-center gap-2">
        {tabs.map((tab, index) => (
          <Button
            key={tab.value}
            variant={index === 0 ? "default" : "ghost"}
            disabled={index !== 0}
            className="rounded-none border-b-2 border-transparent px-6"
          >
            {tab.label}
          </Button>
        ))}
      </nav>
    </section>
  );
}