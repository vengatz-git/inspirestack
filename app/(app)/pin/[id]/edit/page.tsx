import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { getTopics } from "@/features/topic";
import { PinEditPage } from "@/features/pin/components/pin-edit-page"
import { getPinByIdService } from "@/features/pin/services/get-pin-by-id";

type EditPinPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPinRoute({
  params,
}: EditPinPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const pin = await getPinByIdService(id, session.user.id);

  if (!pin || pin.authorId !== session.user.id) {
    notFound();
  }

  const topics = await getTopics();

  return <PinEditPage pin={pin} topics={topics} />;
}