import { CreatePinPage } from "@/features/upload/components/create-pin-page";
import { getTopics } from "@/features/topic";

export default async function CreatePage() {
  const topics = await getTopics();

  return <CreatePinPage topics={topics} />;
}