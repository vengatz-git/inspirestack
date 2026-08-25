import { CommentForm } from "@/features/comment/components/comment-form";
import type { CommentData } from "@/features/comment/types/comment";

interface CommentsSectionProps {
  pinId: string;
  comments: CommentData[];
}

export function CommentsSection({
  pinId,
  comments,
}: CommentsSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">
        Comments
      </h2>

      <CommentForm pinId={pinId} />

      <div className="mt-6">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No comments yet.
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <article key={comment.id}>
                <p className="text-sm font-medium">
                  {comment.author.displayName ??
                    comment.author.username ??
                    "InspireStack user"}
                </p>

                <p className="text-muted-foreground mt-1 text-sm">
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