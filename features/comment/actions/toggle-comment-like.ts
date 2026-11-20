"use server";

import { auth } from "@/auth";
import { toggleCommentLikeService } from "../services/toggle-comment-like";

interface ToggleCommentLikeActionResult {
  success: boolean;
  isLiked?: boolean;
  likeCount?: number;
  error?: string;
}

export async function toggleCommentLikeAction(
  commentId: string,
): Promise<ToggleCommentLikeActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be signed in to like comments.",
    };
  }

  try {
    const result = await toggleCommentLikeService({
      commentId,
      userId: session.user.id,
    });

    return {
      success: true,
      isLiked: result.isLiked,
      likeCount: result.likeCount,
    };
  } catch (error) {
    console.error("Failed to toggle comment like:", error);
    return {
      success: false,
      error: "Failed to like comment.",
    };
  }
}
