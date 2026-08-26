import { CommentForm } from "@/features/comment/components/comment-form";
import { CommentDeleteButton } from "@/features/comment/components/comment-delete-button";
import type { CommentData } from "@/features/comment/types/comment";

interface CommentsSectionProps {
  pinId: string;
  comments: CommentData[];
  currentUserId: string | null;
}

export function CommentsSection({
  pinId,
  comments,
  currentUserId,
}: CommentsSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Comments
        </h2>

        <span className="text-muted-foreground text-sm">
          {comments.length}
        </span>
      </div>

      <CommentForm pinId={pinId} />

      <div className="mt-6">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No comments yet. Be the first to comment.
          </p>
        ) : (
          <div className="space-y-5">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="group"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium">
                    {comment.author.displayName ??
                      comment.author.username ??
                      "InspireStack user"}
                  </p>

                  {currentUserId === comment.author.id ? (
                    <CommentDeleteButton
                      commentId={comment.id}
                      pinId={pinId}
                    />
                  ) : null}
                </div>

                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  {comment.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}