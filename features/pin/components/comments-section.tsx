import type { CommentData } from "@/features/comment/types/comment";

interface CommentsSectionProps {
  comments: CommentData[];
}

export function CommentsSection({
  comments,
}: CommentsSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">
        Comments
      </h2>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
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

              <p className="mt-1 text-sm text-muted-foreground">
                {comment.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}