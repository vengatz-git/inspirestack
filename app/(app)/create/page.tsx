import { auth } from "@/auth";
import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { getTopics } from "@/features/topic";

import { CreatePinPage } from "@/features/upload/components/create-pin-page";

export default async function CreatePage() {
  const [topics, session] = await Promise.all([
    getTopics(),
    auth(),
  ]);

  const boards = session?.user?.id
    ? await getBoardsByUserService({
        userId: session.user.id,
        includePrivate: true,
      })
    : [];

  return <CreatePinPage topics={topics} boards={boards} />;
}