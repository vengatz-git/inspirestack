import { FeedGrid } from "@/features/feed/components/feed-grid";
import { EmptyProfileContent } from "@/features/profile/components/empty-profile-content";

import { getTopicBySlug } from "../services/get-topic-by-slug";

type Topic = NonNullable<Awaited<ReturnType<typeof getTopicBySlug>>>;

interface TopicPageProps {
  topic: Topic;
}

export function TopicPage({ topic }: TopicPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">{topic.name}</h1>

        <p className="text-muted-foreground mt-2">
          {topic.pins.length} {topic.pins.length === 1 ? "Pin" : "Pins"}
        </p>
      </header>

      {topic.pins.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h2 className="text-xl font-semibold">No pins yet</h2>

          <p className="text-muted-foreground mt-2">
            Be the first person to publish a pin in this topic.
          </p>
        </div>
      ) : (
        <FeedGrid pins={topic.pins} />
      )}
    </main>
  );
}
