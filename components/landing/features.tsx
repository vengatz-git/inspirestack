import { Bookmark, Compass, Sparkles } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Discover Inspiration",
    description:
      "Explore curated ideas across design, photography, architecture, art, and more.",
  },
  {
    icon: Bookmark,
    title: "Organize Collections",
    description:
      "Save your favorite discoveries into beautiful collections that are always easy to revisit.",
  },
  {
    icon: Sparkles,
    title: "Share Your Creativity",
    description:
      "Publish your own work and inspire creators around the world through a modern visual platform.",
  },
];

export function Features() {
  return (
    <section className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Why InspireStack
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Built for modern creators.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Everything you need to discover inspiration, organize ideas,
            and showcase your creativity in one beautiful experience.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-border/50
                  bg-card/50
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}