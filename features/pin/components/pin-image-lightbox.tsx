"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PinImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function PinImageLightbox({
  isOpen,
  onClose,
  imageUrl,
  altText,
  imageWidth = 1200,
  imageHeight = 1200,
}: PinImageLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom and pan when opening or closing
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 3.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        handleZoomIn();
      } else if (event.key === "-") {
        event.preventDefault();
        handleZoomOut();
      } else if (event.key === "0") {
        event.preventDefault();
        handleResetZoom();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleZoomIn, handleZoomOut, handleResetZoom]);

  // Handle click on the image: toggle between 1x and 2x
  function handleImageClick(event: React.MouseEvent) {
    event.stopPropagation();
    if (scale > 1) {
      handleResetZoom();
    } else {
      setScale(2);
    }
  }

  // Mouse drag to pan when zoomed
  function handleMouseDown(event: React.MouseEvent) {
    if (scale <= 1) return;
    event.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (!isDragging || scale <= 1) return;
    event.preventDefault();
    setPosition({
      x: event.clientX - dragStartRef.current.x,
      y: event.clientY - dragStartRef.current.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  // Touch drag to pan on mobile
  function handleTouchStart(event: React.TouchEvent) {
    if (scale <= 1 || event.touches.length !== 1) return;
    const touch = event.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  }

  function handleTouchMove(event: React.TouchEvent) {
    if (!isDragging || scale <= 1 || event.touches.length !== 1) return;
    const touch = event.touches[0];
    setPosition({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y,
    });
  }

  function handleTouchEnd() {
    setIsDragging(false);
  }

  // Wheel to zoom
  function handleWheel(event: React.WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-200 animate-in fade-in select-none"
      onClick={() => {
        if (scale === 1) {
          onClose();
        } else {
          handleResetZoom();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Top Toolbar */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="max-w-[50%] truncate text-xs font-medium text-white/70">
          {altText}
        </p>

        <div className="flex items-center gap-2">
          {/* Zoom In */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Zoom in"
            disabled={scale >= 3.5}
            onClick={handleZoomIn}
            className="size-10 rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white disabled:opacity-30"
          >
            <ZoomIn className="size-4.5" />
          </Button>

          {/* Zoom Out */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Zoom out"
            disabled={scale <= 1}
            onClick={handleZoomOut}
            className="size-10 rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white disabled:opacity-30"
          >
            <ZoomOut className="size-4.5" />
          </Button>

          {/* Reset Zoom */}
          {scale > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Reset zoom"
              onClick={handleResetZoom}
              className="size-10 rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              <RotateCcw className="size-4.5" />
            </Button>
          )}

          {/* Close Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close lightbox"
            onClick={onClose}
            className="size-10 rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="size-5" />
          </Button>
        </div>
      </div>

      {/* Image Container */}
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden p-4 sm:p-10"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          }}
          onClick={handleImageClick}
          className="relative max-h-full max-w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={altText}
            className="max-h-[85vh] max-w-[90vw] object-contain select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-none absolute bottom-4 text-center text-xs text-white/50 sm:bottom-6">
        {scale > 1
          ? "Drag to pan • Click to reset"
          : "Click to zoom • Press Esc to close"}
      </div>
    </div>,
    document.body,
  );
}
