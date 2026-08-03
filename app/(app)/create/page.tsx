import { CreatePinForm } from "@/features/upload";
import { getTopics } from "@/features/topic";

export default async function CreatePage() {
  const topics = await getTopics();

  console.log("Topics:", topics);

  return (
    <main className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Create Pin
          </h1>

          <p className="mt-2 text-muted-foreground">
            Upload an image and share your inspiration.
          </p>
        </div>
      </div>

      <CreatePinForm topics={topics} />
    </main>
  );
}