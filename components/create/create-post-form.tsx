"use client";

import { ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { ImagePicker } from "./image-picker";

export function CreatePostForm() {

    const [image, setImage] = useState<File | null>(null);

  return (
    <section className="grid gap-10 lg:grid-cols-[420px_1fr]">
      <ImagePicker onImageSelect={setImage} />

      {/* <div className="flex aspect-square items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/30">
        <div className="flex flex-col items-center gap-4 text-center">
          <ImagePlus className="h-14 w-14 text-muted-foreground" />

          <div>
            <h3 className="text-lg font-semibold">
              Upload an image
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              PNG, JPG or WEBP up to 5 MB
            </p>
          </div>

          <Button>Select Image</Button>
        </div>
      </div> */}

      {/* Form */}

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Title
          </label>

          <input
            placeholder="Give your post a title..."
            className="w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Description
          </label>

          <textarea
            rows={8}
            placeholder="Tell people about your post..."
            className="w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <Button size="lg">
          Publish Post
        </Button>
      </div>
    </section>
  );
}