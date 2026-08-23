"use client";

import { useCallback, useState } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { createPortal } from "react-dom";

import Cropper, { type Area, type Point } from "react-easy-crop";

type ProfileMediaEditorProps = {
  imageUrl: string;
  aspect: number;
  onCancel: () => void;
  onConfirm: (file: File) => void;
};

export function ProfileMediaEditor({
  imageUrl,
  aspect,
  onCancel,
  onConfirm,
}: ProfileMediaEditorProps) {
  const [crop, setCrop] = useState<Point>({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  async function handleConfirm() {
    if (!croppedAreaPixels || isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      const file = await createCroppedImage(
        imageUrl,
        croppedAreaPixels,
      );

      onConfirm(file);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <ProfileMediaEditorPortal>
      <div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onCancel();
          }
        }}
      >
        <div className="bg-background flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative h-[64vh] min-h-80 w-full">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              objectFit="contain"
            />
          </div>

          <div className="space-y-4 border-t p-4">
            <label
              htmlFor="profile-media-zoom"
              className="text-sm font-medium"
            >
              Zoom
            </label>

            <input
              id="profile-media-zoom"
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(event) =>
                setZoom(Number(event.target.value))
              }
              className="w-full"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                disabled={isProcessing}
                className="hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={!croppedAreaPixels || isProcessing}
                className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing ? "Preparing..." : "Use Image"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfileMediaEditorPortal>
  );
}

function ProfileMediaEditorPortal({
  children,
}: {
  children: React.ReactNode;
}) {
 const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return createPortal(children, document.body);
}

async function createCroppedImage(
  imageUrl: string,
  crop: Area,
): Promise<File> {
  const image = await loadImage(imageUrl);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image canvas.");
  }

  canvas.width = crop.width;
  canvas.height = crop.height;

  context.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("Could not create cropped image."));
          return;
        }

        resolve(result);
      },
      "image/jpeg",
      0.9,
    );
  });

  return new File([blob], "profile-image.jpg", {
    type: "image/jpeg",
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load image."));

    image.src = src;
  });
}