"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { PinWithProfile } from "@/types/pin-with-profile";

interface PinImageDetailsDialogProps {
  pin: PinWithProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PinImageDetailsDialog({
  pin,
  open,
  onOpenChange,
}: PinImageDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            Image Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <Detail label="Title" value={pin.title} />

          <Detail
            label="Dimensions"
            value={`${pin.width} × ${pin.height}`}
          />

          <Detail
            label="Aspect Ratio"
            value={`${pin.width}:${pin.height}`}
          />

          <Detail
            label="Image URL"
            value="Cloudinary"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}