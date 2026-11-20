import { auth } from "@/auth";
import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { getTopics } from "@/features/topic";
import { getDraftsByUserService } from "@/features/upload/services/get-drafts-by-user";

import { CreatePinPage } from "@/features/upload/components/create-pin-page";

export default async function CreatePage() {
  const [topics, session] = await Promise.all([getTopics(), auth()]);

  const [boards, drafts] = session?.user?.id
    ? await Promise.all([
        getBoardsByUserService({
          userId: session.user.id,
          includePrivate: true,
        }),
        getDraftsByUserService(session.user.id),
      ])
    : [[], []];

  return (
    <CreatePinPage
      topics={topics}
      boards={boards}
      initialDrafts={drafts}
    />
  );
}
