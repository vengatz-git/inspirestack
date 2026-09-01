import { getTopics } from "@/features/topic";

import { CreatePinPage } from "@/features/upload/components/create-pin-page";

export default async function CreatePage() {
  const topics = await getTopics();

  return <CreatePinPage topics={topics} />;
}