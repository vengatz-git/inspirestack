import { notFound } from "next/navigation";

import { TopicPage } from "@/features/topic/components/topic-page";
import { getTopicBySlug } from "@/features/topic/services/get-topic-by-slug";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({
  params,
}: TopicPageProps) {
  const { slug } = await params;

  const topic = await getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return <TopicPage topic={topic} />;
}