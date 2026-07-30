import { CreatePinForm } from "@/features/upload";

export default function CreatePage() {
  return (
    <main className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Create Pin
          </h1>

          <p className="text-muted-foreground mt-2">
            Upload an image and share your inspiration.
          </p>
        </div>
      </div>

      <CreatePinForm />
    </main>
  );
}