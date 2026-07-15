import { CreatePostForm } from "@/components/create/create-post-form";

export default function CreatePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Create Post
        </h1>

        <p className="mt-2 text-muted-foreground">
          Share something inspiring with the community.
        </p>
      </div>

      <CreatePostForm />
    </main>
  );
}