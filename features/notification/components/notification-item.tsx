"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Reply,
  UserPlus,
} from "lucide-react";

import type { Notification } from "../types/notification";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

function formatNotificationTime(
  date: Date,
) {
  const seconds = Math.floor(
    (Date.now() - date.getTime()) / 1000,
  );

  if (seconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d`;
  }

  return date.toLocaleDateString();
}

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const actorName =
    notification.actorDisplayName ??
    notification.actorUsername ??
    "Someone";

  const message =
    notification.type === "COMMENT"
      ? "commented on your Pin"
      : notification.type === "REPLY"
        ? "replied to your comment"
        : notification.type === "FOLLOW"
          ? "started following you"
        : notification.type === "LIKE"
          ? "liked your Pin"
          : "saved your Pin";

  const Icon =
    notification.type === "COMMENT"
      ? MessageCircle
      : notification.type === "REPLY"
        ? Reply
        : notification.type === "FOLLOW"
          ? UserPlus
        : notification.type === "LIKE"
          ? Heart
          : Bookmark;

  const href = notification.type === "FOLLOW"
    ? notification.actorUsername
      ? `/profile/${notification.actorUsername}`
      : "/"
    : notification.pinId
      ? `/pin/${notification.pinId}`
      : "/";

  const activityLabel = notification.type === "FOLLOW"
    ? "View profile"
    : notification.pinTitle ?? "View activity";

  return (
    <Link
      href={href}
      onClick={() => onRead(notification.id)}
      className={`flex gap-3 p-3 transition-colors hover:bg-muted ${
        notification.readAt ? "" : "bg-muted/40"
      }`}
    >
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
        <Image
          src={
            notification.actorImage ??
            "/default-avatar.svg"
          }
          alt={actorName}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-semibold">
            {actorName}
          </span>{" "}
          {message}
        </p>

        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Icon className="size-3.5" />

          <span className="truncate">
            {activityLabel}
          </span>

          <span className="shrink-0">
            · {formatNotificationTime(
              notification.createdAt,
            )}
          </span>
        </div>
      </div>

      {notification.pinImageUrl && (
        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={notification.pinImageUrl}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      )}

      {!notification.readAt && (
        <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
      )}
    </Link>
  );
}