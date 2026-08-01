import { getTopics } from "../services/get-topics";
import { TopicChip } from "./topic-chip";

export async function TopicList() {
  const topics = await getTopics();

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <TopicChip key={topic.id} label={topic.name} />
      ))}
    </div>
  );
}