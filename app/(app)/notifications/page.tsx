import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getNotifications } from "@/features/notification/services/get-notifications";
import { NotificationsPage } from "@/features/notification/components/notifications-page";
import type { Notification } from "@/features/notification/types/notification";

export const metadata = {
  title: "Notifications | InspireStack",
  description: "View and manage your recent notifications.",
};

export default async function NotificationsRoute() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const notifications = await getNotifications(session.user.id);

  return (
    <NotificationsPage
      initialNotifications={notifications as Notification[]}
    />
  );
}
