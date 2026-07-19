"use client";

import React, { useState } from "react";
import {
  Copy,
  Download,
  ExternalLink,
  Info,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { copyLink } from "@/lib/copy-link";
import { downloadImage } from "@/lib/download-image";

import type { PinWithProfile } from "@/types/pin-with-profile";

import { PinImageDetailsDialog } from "../dialogs/pin-image-details-dialog";

interface PinCardMenuProps {
  pin: PinWithProfile;
  children: React.ReactNode;
}

export function PinCardMenu({
  pin,
  children,
}: PinCardMenuProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCopyLink = async (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/pin/${pin.id}`;

    const result = await copyLink(url);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleDownload = async (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await downloadImage(
      pin.imageUrl,
      `${pin.title || "inspirestack-image"}.jpg`
    );

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleOpenOriginal = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(
      pin.imageUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleImageDetails = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setDetailsOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl"
        >
          <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleOpenOriginal}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Original
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleImageDetails}>
            <Info className="mr-2 h-4 w-4" />
            Image Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PinImageDetailsDialog
        pin={pin}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}