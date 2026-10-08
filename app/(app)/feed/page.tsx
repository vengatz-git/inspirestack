import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getBoardsByUserService } from "@/features/board/services/get-boards-by-user";
import { HomeFeed } from "@/features/feed/components/home-feed";
import { getFeed } from "@/features/feed/services/get-feed";

export default async function FeedPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [feed, boards] = await Promise.all([
    getFeed({
      viewerUserId: session.user.id,
    }),
    getBoardsByUserService({
      userId: session.user.id,
    }),
  ]);

  return (
    <HomeFeed
      feed={feed}
      boards={boards}
    />
  );
}