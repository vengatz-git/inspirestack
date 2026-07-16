"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ImagePicker } from "./image-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreatePostForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function handlePublish() {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message ?? "Failed to publish.");
      }

      alert("🎉 Post published!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[420px_1fr]">
      <ImagePicker onImageSelect={setImage} />

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>

          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>

          <Textarea
            id="description"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell people about your post..."
          />
        </div>

        <Button
          size="lg"
          onClick={handlePublish}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </Button>
      </div>
    </section>
  );
}